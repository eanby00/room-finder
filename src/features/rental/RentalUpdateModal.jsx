import { useState } from 'react';
import * as XLSX from 'xlsx';
import Modal from '../../components/Modal';
import { APPS_SCRIPT_URL } from '../../config/appScript';
import './RentalUpdateModal.css';

function RentalUpdateModal({ onClose }) {
  const [uploadStatus, setUploadStatus] = useState('idle');

  const parseExcelFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
      type: 'array',
    });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: '',
    });

    console.log(rows);

    return rows;
  };

  const sendRowsToAppsScript = async (file, rows) => {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        type: 'rentalUpdate',
        fileName: file.name,
        lastModified: file.lastModified,
        rows,
      }),
    });
  };

  const handleDrop = async (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    try {
      setUploadStatus('uploading');

      const rows = await parseExcelFile(file);

      await sendRowsToAppsScript(file, rows);

      setUploadStatus('success');
    } catch {
      setUploadStatus('error');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Modal title="대관 데이터 갱신" onClose={onClose}>
      <div
        className="rental-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {uploadStatus === 'idle' && (
          <>
            <p className="rental-drop-title">
              공간사용현황 파일을 여기에 드래그앤드롭해 주세요.
            </p>
            <p className="rental-drop-description">
              엑셀 파일을 업로드하면 대관 데이터를 갱신합니다.
            </p>
          </>
        )}

        {uploadStatus === 'uploading' && (
          <p className="rental-drop-title">
            대관 데이터를 갱신하는 중입니다...
          </p>
        )}

        {uploadStatus === 'success' && (
          <p className="rental-drop-title">
            대관 데이터 갱신이 완료되었습니다.
          </p>
        )}

        {uploadStatus === 'error' && (
          <p className="rental-drop-title">업로드 중 오류가 발생했습니다.</p>
        )}
      </div>
    </Modal>
  );
}

export default RentalUpdateModal;
