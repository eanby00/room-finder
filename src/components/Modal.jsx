import './Modal.css';

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose ? onClose : undefined}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
        )}

        <div className="modal-content">{children}</div>

        {onClose && (
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
