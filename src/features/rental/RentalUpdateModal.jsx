import { useState } from 'react';
import Modal from '../../components/Modal';
import { parseRentalExcelFile } from './rentalParser';
import './RentalUpdateModal.css';
import { sendRentalRowsToSheet } from './rentalApi';

const createRentalMeta = (rentals, lastUpdatedAt) => {
  const buildings = [
    ...new Set(rentals.map((rental) => rental.건물).filter(Boolean)),
  ];

  return buildings.reduce((acc, building) => {
    acc[building] = {
      lastUpdatedAt,
    };

    return acc;
  }, {});
};

function RentalUpdateModal({ onClose, setRentals, setRentalMeta }) {
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadErrorMessage, setUploadErrorMessage] =
    useState('업로드 중 오류가 발생했습니다.');

  const handleDrop = async (event) => {
    event.preventDefault();

    if (uploadStatus === 'uploading') return;

    const file = event.dataTransfer.files[0];
    if (!file) return;

    try {
      setUploadStatus('uploading');

      const result = await parseRentalExcelFile(file);

      await sendRentalRowsToSheet({
        rentals: result.rentals,
        lastUpdatedAt: result.lastUpdatedAt,
      });
      setRentals(result.rentals);
      setRentalMeta(createRentalMeta(result.rentals, result.lastUpdatedAt));
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setUploadErrorMessage(error.message);
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
              공간사용현황 파일을 여기에 넣어주세요.
            </p>
            <p className="rental-drop-description">
              교내정보시스템의 시설물대관현황조회에서
            </p>
            <p className="rental-drop-description">다운받을 수 있습니다.</p>
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
          <p className="rental-drop-title">{uploadErrorMessage}</p>
        )}
      </div>
    </Modal>
  );
}

export default RentalUpdateModal;
