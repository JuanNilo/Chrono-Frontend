import React, { useEffect, useState } from 'react';
import { BsFillBackspaceReverseFill } from 'react-icons/bs';

interface AlertProps {
    message: string;
    isPositive: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, isPositive, isOpen, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <div className='flex'>
            {isOpen && (

                <div
                    className={`flex w-[100%] justify-content p-4 mt-4 text-sm rounded-lg  ${isPositive ? 'bg-green-100 text-green-700 border-1 border-green-500' : 'bg-red-100 text-red-700'}`}
                    role="alert"
                >   {/**
                <button className="mr-3" onClick={handleClose}>
                        <BsFillBackspaceReverseFill size={20} color='emerald' />
                    </button> */}

                    {message}

                </div>
            )}
        </div>
    );
};

export default Alert;
