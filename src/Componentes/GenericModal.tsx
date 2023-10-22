import React, { ReactNode } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface GenericModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    background: 'transparent',
    border: 'none',
    inset: 'auto',
  },
};

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      contentLabel="Modal"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        {children}
        <button
          onClick={onRequestClose}
          className="bg-[#A8B444] text-white px-4 py-2 rounded-md"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default GenericModal;
