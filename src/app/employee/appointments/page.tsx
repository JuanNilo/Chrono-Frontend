'use client';
import patient from "@/app/patient/page";
import Container from "@/components/ui/Container"
import DenyAcces from "@/components/ui/DenyAcces";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { FaCalendar, FaEdit, FaEye, FaUser } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { useUserStore } from "@/store/userStorage";
import axios from "axios";
import ModalEditDate from "@/components/modal/modalEditDate";
import ModalChangeStatus from "@/components/modal/modalChangeStatus";

interface Date {
    date: {
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


export default function AppointmentsPage() {

    const [dates, setDates] = useState<Date[]>([]);
    const { id_user, role_user } = useUserStore();
    const [idDate, setIdDate] = useState<number>(0);
    const [isEditAviable, setIsEditAviable] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);  

    const closeModal = () => {
        setIsOpenModalStatus(false);
        fetchDates();
        setIsOpenModal(false);
    };

    const openModal = (id: number, editMode : boolean) => {
        console.log(id)
        setIsEditAviable(editMode);
        setIdDate(id);
        setIsOpenModal(true);
    }
    
    const openModalStatus = (id: number) => {
        setIdDate(id);
        setIsOpenModalStatus(true);
    }

    console.log('Id employee:', id_user)

    const fetchDates = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/officer/${id_user}`);
            console.log(response.data);
            setDates(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchDates();
    },[isOpenModal, isOpenModalStatus]
    );

    useEffect(() => {
        console.log('id_user:', id_user)
        if(id_user != -1)
            {

                fetchDates();
            }
    }, []);

    if (role_user === 'patient') {
        return (
            <DenyAcces />
        )
    }


    return (
        <div className="w-[100%] p-8">
            <ModalEditDate id={idDate} isOpen={isOpenModal} onClose={closeModal} isEditAviable={isEditAviable} />
            <ModalChangeStatus id={idDate} isOpen={isOpenModalStatus} onClose={closeModal} />
            <>
                <h1 className=" text-3xl font-bold">Historial de citas medicas</h1>
                <p className="text-xl flex gap-x-2">Utilice {<FaEye size={24} color="black" />} para ver la cita, {<FaEdit size={24} color="black" />} para editar la cita, {<FaCalendar size={24} color="black"/>} para reagendar la cita y {<FaUser size={24} color="black" />} para ver el perfil del paciente.
                </p>
                <p className="text-xl font-semibold">Seleccione el estado de la cita para cambiarlo.</p>
                <div className=" h-[70vh] overflow-scroll mt-4">
                    <table className=" w-full">
                        <thead className=" border-b-1 h-12 sticky top-0 bg-emerald-100 border-gray-300 p-4 ">
                            <tr className="rounded-t-xl ">
                                <th>Paciente</th>
                                <th>Doctor</th>
                                <th>Motivo</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                dates.length === 0 ? (
                                    <tr>
                                        <td className="text-center" colSpan={6}>
                                            Cargando datos...
                                        </td>
                                    </tr>
                                ) :

                                (

                                    dates.map((date) => (
                                        <tr key={date.date.id} className="p-4 h-12 hover:bg-gray-100  text-center border-b-1 border-gray-200">
                                        <td>{date.patientName} {date.patientLastname}</td>
                                               <td>{date.medicName} {date.medicLastName}</td>  
                                               
                                        <td>{date.consultationReason}</td>
                                        <td>{date.day} - {date.hour}</td>
                                        <td className="text-center">
                                        
                                                    <button onClick={() => openModalStatus(date.date.id)} disabled={role_user === 'patient'}>
                                                        <p className={` w-24 mx-auto 
                                                rounded-lg border-2 border-black ${date.date.status == 'Pendiente' ? 'bg-yellow-100 text-black border-yellow-400' : date.date.status == 'Confirmada' ? 'bg-green-100 text-black border-green-400' : 'bg-red-100 text-black border-red-400'}
                                                `}>{date.date.status}</p>
                                                    </button>
                                        </td>
                                        <td className="flex justify-around items-center py-4">
                                        <Link href={`/record/${date.date.patient_id}`}>
                                        <FaUser size={24} color="black" />
                                        </Link>
                                        {/* Ver cita */}
                                        <button onClick={() => openModal(date.date.id, false)}>
                                            <FaEye size={24} color="black" />
                                        </button>
                                        {/* Calendario */}
                                        <FaCalendar size={24} color="black" />
                                        {/* Editar cita */}
                                        <button onClick={() => openModal(date.date.id, true)}> 
                                            <FaEdit size={24} color="black" />
                                        </button>
                                        </td>
                                        </tr>
                                    ))
                                )                           
                            }
                        </tbody>
                    </table>
                </div>
            </>
        </div>
    )
}
