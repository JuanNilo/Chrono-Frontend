'use client';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useUserStore } from '@/store/userStorage';
import ModalAddRecord from '../modal/modalAddRecord';

interface Treatment {
    medicalRecord: {
        id: number;
        id_patient: number;
        id_employee: number;
        date: string;
        diagnostic: string;
        treatment: string;
        medicine: string;
        id_date: number;
    };
    patientName: string;
    patientLastname: string;
    medicName: string;
    medicLastName: string;
}

interface Date{
    id: number;
    patient_id: number;
    officer_id: number;
    procces: string;
    
}
export default function ListTreatment({id, idDate}:{id: number, idDate: number}){
    const [isOpenModal, setIsOpenModal] = useState(false);

    const {role_user, id_user} = useUserStore();
    const [idDoctor, setIdDoctor] = useState<number>(0);

    const closeModalLogin = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    }
   
    const [dataRecord, setDataRecord] = useState<Treatment[]>([]);
    const [dateInfo, setDateInfo] = useState<Date>({id: 0, patient_id: 0, officer_id: 0, procces: ''});

    const fetchDateData = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/${idDate}`);
            console.log(response.data)
            setIdDoctor(response.data.officer_id);
            setDateInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRecordData = async () => {
        try {
            console.log(idDate)
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/medical-records/date/${idDate}`);
            setDataRecord(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if(id == 0) return; 
        fetchDateData();
        fetchRecordData();
    }, []);

    useEffect(() => {
        fetchRecordData();
    }
    , [isOpenModal]);
    return(
        
        <div className="my-5 h-[85%]">
            <ModalAddRecord idDate={idDate} idPatient={id} isOpen={isOpenModal} onClose={closeModalLogin} />
            <div className=' flex justify-between h-[20%] items-center'>
                <h1 className="font-semibold text-xl">Tratamientos:</h1>
                {
                   (id_user == dateInfo.officer_id) ?   <button onClick={openModal} className='bg-primaryColor hover:bg-[#355e87] text-white font-bold py-1 px-2 rounded'>
                        Agregar tratamiento
                    </button> : null
                }
            </div>

            <div className='overflow-scroll h-[80%] '>
            <table className="table-auto w-full">
                <thead className="sticky top-0">
                    <tr className='bg-white'>
                        <th className="border px-2">Diagnostico</th>
                        <th className="border px-2">Medicamento</th>
                        <th className="border px-2">Tratamiento</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {
                        dataRecord.length === 0 ? (
                            <tr>
                                <td className="text-center" colSpan={3}>
                                    No hay tratamientos...
                                </td>
                            </tr>
                        ) :
                        (dataRecord.map((record) => (
                            <tr key={record.medicalRecord.id}>
                                <td className="border px-2">{record.medicalRecord.diagnostic}</td>
                                <td className="border px-2">{record.medicalRecord.medicine}</td>
                                <td className="border px-2">{record.medicalRecord.treatment}</td>
                            </tr>)
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}