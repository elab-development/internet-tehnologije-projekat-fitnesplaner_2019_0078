import React from 'react';

const Modal = ({ content, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
