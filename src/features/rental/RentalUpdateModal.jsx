import { useState } from 'react';
import Modal from '../../components/Modal';
import { parseRentalExcelFile } from './rentalParser';
import { sendRentalRowsToSheet } from './rentalApi';
import { createBuildingMeta } from './rentalUtils';
import { DEFAULT_UPLOAD_ERROR_MESSAGE, UPLOAD_STATUS } from './rentalConstants';
import './RentalUpdateModal.css';

function RentalUpdateModal({ onClose, setClassroomData }) {
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [uploadErrorMessage, setUploadErrorMessage] = useState(
    DEFAULT_UPLOAD_ERROR_MESSAGE
  );

  const handleDrop = async (event) => {
    event.preventDefault();

    if (uploadStatus === UPLOAD_STATUS.UPLOADING) return;

    const file = event.dataTransfer.files[0];
    if (!file) return;

    try {
      setUploadStatus(UPLOAD_STATUS.UPLOADING);

      const result = await parseRentalExcelFile(file);

      await sendRentalRowsToSheet({
        rows: result.rentals,
        rentalLastUpdatedAt: result.rentalLastUpdatedAt,
      });

      setClassroomData((prev) => ({
        ...prev,
        rentals: result.rentals,
        buildingMeta: createBuildingMeta(
          result.rentals,
          result.rentalLastUpdatedAt
        ),
      }));

      setUploadStatus(UPLOAD_STATUS.SUCCESS);
    } catch (error) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      setUploadErrorMessage(error.message || DEFAULT_UPLOAD_ERROR_MESSAGE);
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
        {uploadStatus === UPLOAD_STATUS.IDLE && (
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

        {uploadStatus === UPLOAD_STATUS.UPLOADING && (
          <p className="rental-drop-title">
            대관 데이터를 갱신하는 중입니다...
          </p>
        )}

        {uploadStatus === UPLOAD_STATUS.SUCCESS && (
          <p className="rental-drop-title">
            대관 데이터 갱신이 완료되었습니다.
          </p>
        )}

        {uploadStatus === UPLOAD_STATUS.ERROR && (
          <p className="rental-drop-title">{uploadErrorMessage}</p>
        )}
      </div>
    </Modal>
  );
}

export default RentalUpdateModal;
