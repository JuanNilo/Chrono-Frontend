'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillBackspaceFill } from 'react-icons/bs';
import Image from 'next/image';
import { useUserStore } from '@/store/userStorage';
import ListTreatment from '../data/ListTreatment';

interface ModalEditDateProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    isEditAviable: boolean;
}

interface time {
    id: number,
    initial_hour: string,
    id_employee: number,
    date: string,
    id_box: number,
}
interface Date {
    date : {
        id: number;
        time_id: number;
        patient_id: number;
        officer_id: number;
        process: string;
        status: string;
        id_consultation_reason: number;
    }
    patientName: string;
    patientLastname: string;
    medicName: string;
    medicLastName: string;
    day: string;
    hour: string;
    consultationReason: string;
    consultationReasonDescription: string;
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

interface consultationReason {
    id: number;
    name: string;
    description: string;
}

interface Schedule {
    id: number;
    initial_hour: string;
}

export default function ModalEditDate({ id, isOpen, onClose, isEditAviable }: ModalEditDateProps ) {
    const { id_user } = useUserStore();
    const [tratamiento, setTratamiento] = useState<string>('');
    const [diagnostico, setDiagnostico] = useState<string>('');
    const [medicamento, setMedicamento] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [idPatient, setIdPatient] = useState<number>(0);

    const [user, setUser] = useState<User | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<time | null>(null);

    // Datos nueva cita
    const [newDayDate, setNewDayDate] = useState<string>(time?.date || new Date().toISOString().split('T')[0]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [IdScheduleSelect, setIdScheduleSelect] = useState<string>('');
    const [newHour, setNewHour] = useState<string>('');
    const [IdReasonSelect, setIdReasonSelect] = useState<number>(0);

    const [consultationReasons, setConsultationReasons] = useState<consultationReason[]>([]);

    const fetchDate = async () => {
        try {
            console.log(id);
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/data/${id}`);
            setNewDayDate(response.data.date.day);
            fetchDataUser(response.data.date.patient_id);
            setNewHour(response.data.date.hour);
            setIdPatient(response.data.date.patient_id);
            fetchTime(response.data.date.time_id);
            setDate(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Query que modifica la cita médica
    const fetchModDate = async () => {
        setLoading(true);
        setIsError(false);
        console.log('modificando cita médica');
        console.log(newDayDate, IdScheduleSelect, IdReasonSelect);
        if (newDayDate == '' || IdScheduleSelect == '' || IdReasonSelect == 0) {
            setErrorMessage('Todos los campos son requeridos');
            setIsError(true);
            setLoading(false);
            return;
        }
        try {
            console.log('id', id);
            const response = await axios.put(`https://backend-plataforma.onrender.com/api/dates/${id}`, {
                time_id: parseInt(IdScheduleSelect),
                patient_id: idPatient,
                officer_id: date?.date.officer_id,
                process: date?.date.process,
                status: date?.date.status,
                id_consultation_reason: date?.date.id_consultation_reason,
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
    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        console.log('id', id);

        if(id != 0){
            fetchDate();
        }
            fetchConsultationReasons();
        
    }, [id]);

    const fetchTime = async (id: number) => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/schedules/${id}`);
            console.log(response.data);
            setTime(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchConsultationReasons = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/consultation-reasons/`);
            console.log(response.data);
            setConsultationReasons(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const fetchDataUser = async (idPatient:number) => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${idPatient}`);
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSchedule();
    }, [newDayDate]);
    
    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/schedules/employee/${date?.date.officer_id}/date/${newDayDate}`);
            console.log(response.data);
            setSchedules(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div className={`relative z-30 ${isEditAviable ? 'h-[60%]' : ' h-[80%] md:h-[90%]'} w-[100%] md:w-[50%] rounded-lg mx-auto bg-white shadow-lg flex items-center justify-center border-2 border-slate-200`}>
                        <div className="col-span-1 flex flex-col h-[100%] w-[100%] ">
                            {/* Parte superior */}
                            <div className='flex justify-between border-b-1 border-slate-200 p-4 '>
                                <p className='text-black font-semibold text-xl '>
                                    Información de la cita médica
                                </p>

                                <button onClick={handleClose}>
                                    <BsFillBackspaceFill size={35} color='black' />
                                </button>

                            </div>
                            {/* contenido del tratamiento */}
                            <div className='h-[40%] py-4 grid grid-cols-2 gap-4 mx-auto w-[90%] '>
                                <div className="flex flex-col gap-y-4">
                                    {/* Nombre del paciente */}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Paciente:</p>
                                        <p className='text-black text-md '>{date?.patientName} {date?.patientLastname}</p>
                                    </div>
                                    {/* Email del paciente */}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Correo:</p>
                                        <p className='text-black text-md '>{user?.email} </p>
                                    </div>
                                    
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Fecha:</p>
                                        {
                                            isEditAviable ? (
                                                <input type='date' className='text-black text-md border-black border-1 rounded-sm px-3' value={newDayDate} onChange={(e) => setNewDayDate(e.target.value)} />
                                            ) : (
                                                <p className='text-black text-md '>{date?.day}</p>
                                            )
                                        }
                                    </div>
                                    {/* Hora de la consulta */}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Hora:</p>
                                      
                                      {
                                            isEditAviable ? (
                                                <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg px-4"
                        onChange={(e) => setIdScheduleSelect(e.target.value)}
                        
                    >
                        <option defaultValue="" disabled selected>Seleccione una hora</option>
                        {schedules.map((schedules, index) => (
                            <option key={index} value={schedules.id}>{schedules.initial_hour}</option>
                        ))}
                    </select>
                                            ) : (
                                                <p className='text-black text-md '>{date?.hour}</p>
                                            )
                                      }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    {/* Medico*/}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Médico:</p>
                                        <p className='text-black text-md '>{date?.date.officer_id}</p>
                                    </div>
                                    {/* Estado */}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Estado:</p>
                                        <p className='text-black text-md '>{date?.date.status}</p>
                                    </div>
                                    {/* Motivo */}
                                    <div className='flex flex-col gap-x-2'>
                                        <p className='text-black font-semibold text-md'>Motivo:</p>
                                        {isEditAviable ? (
                                            // @ts-ignore
                                            <select className="text-black text-md border-black border-1 rounded-sm px-3"
                                                onChange={(e) => setIdReasonSelect(parseInt(e.target.value))}
                                                
                                            >
                                                {consultationReasons.map((reason) => (
                                                    <option key={reason.id} value={reason.id}>{reason.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className='text-black text-md '>
                                                {consultationReasons.find((reason) => reason.id === date?.date.id_consultation_reason)?.name}
                                            </p>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Lista de tratamientos */}
                            {
                                isEditAviable ? 
                                (<div className='w-[100%] h-[30%] mt-4 flex items-end justify-center mb-4'>
                                <button disabled={loading} className="bg-primaryColor text-white p-2 m-2 rounded-md w-32 font-bold shadow-sm" onClick={() => fetchModDate()}>{loading ? 'Cargando...' : 'Editar'}</button>
                                <button className="bg-slate-100 border-1 border-slate-200 shadow-sm text-black p-2 m-2 rounded-md w-32 font-bold" onClick={handleClose}>Cancelar</button>


                                {isError ? (
                                    <div className='h-12'></div>
                                ) : (
                                    <div className="flex justify-center items-center h-12 text-red-500 font-bold">
                                        {errorMessage}
                                    </div>)}
                            </div>)
                                
                                
                                : (
                                    <div className='h-[40%] w-[90%] mx-auto'>
                                        <ListTreatment idDate={id} id={idPatient} />
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}