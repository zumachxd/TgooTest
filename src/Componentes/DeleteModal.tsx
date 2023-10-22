import React from 'react';
import Modal from 'react-modal';
import { DeleteModalProps } from '../interfaces/Interface';

Modal.setAppElement('#root');

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

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onRequestClose,
    onDelete,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={modalStyle}
            contentLabel="Confirmação de Exclusão"
        >
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold">Confirmação de Exclusão</h2>
                <p className="text-gray-600 mb-4">
                    Tem certeza de que deseja excluir esta postagem?
                </p>
                <div>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
