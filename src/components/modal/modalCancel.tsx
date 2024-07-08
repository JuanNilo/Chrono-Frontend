

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModalCancel: React.FC<ModalProps> = ({ isOpen, onConfirm,message, onCancel }) => {
    if (!isOpen) {
        return null;
    }
    


    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className="relative z-30 h-[35%] w-[40%] rounded-lg mx-auto bg-white shadow-lg flex items-center justify-center border-2 border-slate-200">
                    <div className="flex justify-center items-center flex-col w-[60%] gap-y-10 ">
                <h2 className='text-3xl font-semibold'>Confirmación</h2>
                <p className='font-semibold text-center'>{message}</p>
                <div className="flex justify-around w-[100%] ">
                    <button className='bg-emerald-100 border-1 border-green-400 py-2 px-4 rounded-md' onClick={onConfirm}>Confirmar</button>
                    <button className='bg-red-100 border-red-500 border-1 py-2 px-4 rounded-md' onClick={onCancel}>Cancelar</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ModalCancel;