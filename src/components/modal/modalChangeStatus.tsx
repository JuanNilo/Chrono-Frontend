'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillBackspaceFill } from 'react-icons/bs';

interface ModalChangeStatus {
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

interface Date {
    id: number;
    time_id: number;
    patient_id: number;
    officer_id: number;
    process: string;
    status: string;
    id_consultation_reason: number;
}


export default function ModalChangeStatus({ id, isOpen, onClose }: ModalChangeStatus) {

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const [date, setDate] = useState<Date | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleClose = () => {
        onClose();
    };

    const fetchDate = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/${id}`);
            console.log("fetchDate")
            setDate(response.data);
            setStatus(response.data.status);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchModDate = async () => {
        setLoading(true);
        setIsError(false);
        console.log(status)
        console.log('modificando cita médica');
        if (status == '') {
            setErrorMessage('Todos los campos son requeridos');
            setIsError(true);
            setLoading(false);
            return;
        }
        try {
            console.log('id', id);
            const response = await axios.put(`https://backend-plataforma.onrender.com/api/dates/${id}`, {
                time_id: date?.time_id,
                patient_id: date?.patient_id,
                officer_id: date?.officer_id,
                process: date?.process,
                status: status,
                id_consultation_reason: date?.id_consultation_reason,
            });
            console.log(response.data);
            setLoading(false);
            onClose();
        } catch (error) {
            console.error(error);
            setErrorMessage('Ocurrió un error al modificar la cita médica');
            setIsError(true);
            setLoading(false);
    }
}


    useEffect(() => {
        console.log('id', id);

        if (id != 0) {
            fetchDate();
        }
    }, [id]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className="relative z-30 h-[40%] w-[30%] rounded-lg   mx-auto bg-white shadow-lg flex items-center justify-center border-2 border-slate-200">
                        <div className="col-span-1 flex flex-col h-[100%] w-[100%] ">
                            {/* Parte superior */}
                            <div className='  flex justify-between border-b-1 border-slate-200 p-4 '>
                                <p className='text-black font-semibold text-2xl '>
                                    Modificar estado
                                </p>

                                <button onClick={handleClose}>
                                    <BsFillBackspaceFill size={35} color='black' />
                                </button>

                            </div>
                            {/* contenido del tratamiento */}
                            <div className=' h-[80%] py-4 '>


                                <div className="flex justify-around items-center  w-[90%]  h-[90%] mx-auto">
                                    <button onClick={()=>setStatus('Pendiente')} className={`${status == 'Pendiente' ? 'bg-yellow-100 text-black border-yellow-400 border-1' : 'bg-slate-200 text-black'}  h-12 p-2 m-2 rounded-md w-32 font-bold shadow-sm`}>Pendiente</button>
                                    <button onClick={()=>setStatus('Confirmada')} className={`${status == 'Confirmada' ? ' bg-green-100 text-black border-green-400 border-1' : 'bg-slate-200 text-black'}  h-12 p-2 m-2 rounded-md w-32 font-bold shadow-sm`}>Confirmada</button>
                                    <button onClick={()=>setStatus('Cancelada')} className={`${status == 'Cancelada' ? 'bg-red-100 text-black border-red-400 border-1' : 'bg-slate-200 text-black'}  h-12 p-2 m-2 rounded-md w-32 font-bold shadow-sm`}>Cancelada</button>
                                </div>


                            </div>
                            <div className='w-[100%] flex justify-center pb-2'>
                                <button  className="bg-primaryColor text-white p-2 m-2 rounded-md w-32 font-bold shadow-sm" onClick={fetchModDate}>{loading ? 'Cargando...' : 'Cambiar'}</button>
                                <button className="bg-slate-100 border-1 border-slate-200 shadow-sm text-black p-2 m-2 rounded-md w-32 font-bold" onClick={handleClose}>Cancelar</button>


                                {isError ? (
                                    <div className='h-12'></div>
                                ) : (
                                    <div className="flex justify-center items-center h-12 text-red-500 font-bold">
                                        {errorMessage}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}