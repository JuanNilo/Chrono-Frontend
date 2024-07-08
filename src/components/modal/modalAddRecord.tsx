'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillBackspaceFill } from 'react-icons/bs';
import Image from 'next/image';
import { useUserStore } from '@/store/userStorage';

interface ModalAddRecordProps {
    idPatient: number;
    idDate: number;
    isOpen: boolean;
    onClose: () => void;
}

interface User {
    id: number;
    rut: string;
    email: string;
    name: string;
    password: string;
    lastname: string;
    category: string;
}
export default function ModalAddRecord({ idPatient, idDate, isOpen, onClose }: ModalAddRecordProps) {
    const { id_user } = useUserStore();
    const [tratamiento, setTratamiento] = useState<string>('');
    const [diagnostico, setDiagnostico] = useState<string>('');
    const [medicamento, setMedicamento] = useState<string>('');

    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const [user, setUser] = useState<User | null>(null);

    const fetchAddRecord = async () => {
        if (diagnostico === '' || tratamiento === '' || medicamento === '') {
            setErrorMessage('Todos los campos son requeridos');
            setIsError(true);
            return;
        }
        try {
            setLoginLoading(true);
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await axios.post('https://backend-plataforma.onrender.com/api/medical-records', {
                id_patient: idPatient,
                id_employee: id_user,
                date: currentDate,
                diagnostic: diagnostico,
                treatment: tratamiento,
                medicine: medicamento,
                id_date: idDate
            });
            console.log(response.data);
            setLoginLoading(false);
            onClose();
        } catch (error) {
            console.error(error);
            setErrorMessage('Ocurrió un error al agregar el tratamiento');
            setIsError(true);
            setLoginLoading(false)
        }
    }
    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        fetchDataUser();
    }, []);

    const fetchDataUser = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${idPatient}`);
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className="relative z-30 h-[80%] w-[50%] rounded-lg   mx-auto bg-white shadow-lg flex items-center justify-center border-2 border-slate-200">
                        <div className="col-span-1 flex flex-col h-[100%] w-[100%] ">
                            {/* Parte superior */}
                            <div className='  flex justify-between border-b-1 border-slate-200 p-4 '>
                                <p className='text-black font-semibold text-2xl '>
                                    Nuevo tratamiento
                                </p>

                                <button onClick={handleClose}>
                                    <BsFillBackspaceFill size={35} color='black' />
                                </button>

                            </div>
                            {/* contenido del tratamiento */}
                            <div className=' h-[80%] py-4 '>


                                <div className="flex flex-col justify-center my-auto w-[90%]  h-[90%] mx-auto">
                                    <div className='flex items-center gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Paciente:</p>
                                        <p className='text-black text-md '>{user?.name} {user?.lastname}</p>
                                    </div>
                                    <div className='flex items-center gap-x-2 mb-3'>
                                        <p className='text-black font-semibold text-md'>Fecha:</p>
                                        <p className='text-black text-md '>{new Date().toLocaleDateString()}</p>
                                    </div>
                                    {/* Diagnositco */}
                                    <p className='text-black font-semibold text-xl my-[4px] '>Diagnóstico:</p>
                                    <input
                                        type='text'
                                        placeholder="Diagnóstico "
                                        className="p-2  border-slate-400 border-1 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setDiagnostico(event.target.value)} />
                                    {/* Medicamento */}
                                    <p className='text-black font-semibold text-xl my-[4px] '>Medicamento:</p>
                                    <input
                                        type='text'
                                        placeholder="Medicamento"
                                        className="p-2  border-slate-400 border-1 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setMedicamento(event.target.value)} />

                                    <p className='text-black font-semibold text-xl my-[4px] '>Tratamiento:</p>
                                    <textarea
                                        placeholder="Tratamiento"
                                        className="p-2  border-slate-400 min-h-[150px] border-1 rounded-md text-black font-semibold w-full"
                                        onChange={(event) => setTratamiento(event.target.value)} />
                                    </div>
                                

                            </div>
                            <div className='w-[100%] flex justify-center pb-2'>
                                <button disabled={loginLoading} className="bg-primaryColor text-white p-2 m-2 rounded-md w-32 font-bold shadow-sm" onClick={() => fetchAddRecord()}>{loginLoading ? 'Cargando...' : 'Agregar'}</button>
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