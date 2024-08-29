import React from "react";
import "../styles/modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-wrapper-overlay" onClick={onClose}>
      <div
        className="modal-dynamic-content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
