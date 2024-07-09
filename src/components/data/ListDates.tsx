'use client';
import DenyAcces from "@/components/ui/DenyAcces";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { FaCalendar, FaEdit, FaEye, FaUser } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { useUserStore } from "@/store/userStorage";
import axios from "axios";
import ModalEditDate from "@/components/modal/modalEditDate";
import ModalChangeStatus from "@/components/modal/modalChangeStatus";
import { MdCancel } from "react-icons/md";
import ModalCancel from "../modal/modalCancel";

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

interface DateInfo {
    id: number;
    time_id: number;
    patient_id: number;
    officer_id: number;
    process: string;
    status: string;
    id_consultation_reason: number;

}
export default function AppointmentsPage({ id, vista }: { id: number, vista: string }) {

    const [dates, setDates] = useState<Date[]>([]);
    const { id_user, role_user } = useUserStore();
    const [idDate, setIdDate] = useState<number>(0);
    const [isEditAviable, setIsEditAviable] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalStatus, setIsOpenModalStatus] = useState(false);

    const [infoDate, setInfoDate] = useState<DateInfo | null>(null);

    const [idDateCancel, setIdDateCancel] = useState<number>(0);

    const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

    const openModalCancel = (id: number) => {
        setIdDateCancel(id);
        setIsOpenModalCancel(true);
    }

    const closeModalCancel = () => {
        setIsOpenModalCancel(false);
    }

    const closeModal = () => {
        setIsOpenModalStatus(false);
        setIsOpenModal(false);
    };

    const openModal = (id: number, editMode: boolean) => {
        console.log(id)
        setIsEditAviable(editMode);
        setIdDate(id);
        setIsOpenModal(true);
    }

    const openModalStatus = (id: number) => {
        setIdDate(id);
        setIsOpenModalStatus(true);
    }

    const dateToday = new Date().toISOString().split('T')[0]

    // necesito la fecha de hoy
    console.log(dateToday)

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

    const fetchDatesPatientes = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/patient/${id}`);
            setDates(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id_user != -1) {
            if (role_user === 'patient') {
                fetchDatesPatientes();
            } else {
                if(vista === 'paciente'){
                    fetchDatesPatientes();
                }else{
                    fetchDates();
                }
            }
        }
    }, []);


    const fetchDate = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/dates/${idDateCancel}`);
            console.log("fetchDate")
            setInfoDate(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const handleCancelDate = async () => {
        fetchDate();
        
        try {
            console.log(infoDate?.process)
            const response = await axios.put(`https://backend-plataforma.onrender.com/api/dates/${idDateCancel}`, {
                time_id: infoDate?.time_id,
                patient_id: infoDate?.patient_id,
                officer_id: infoDate?.officer_id,
                process: infoDate?.process,
                status: 'Cancelada',
                id_consultation_reason: infoDate?.id_consultation_reason,
            });
            setIsOpenModalCancel(false);
            console.log(response.data);
        } catch (error) {
            console.error(error);
    }
}

    useEffect(() => {
        fetchDates();
    }, [isOpenModal, isOpenModalStatus, isOpenModalCancel]);


    return (
        <div className="w-[100%] md:p-8">
            <ModalEditDate id={idDate} isOpen={isOpenModal} onClose={closeModal} isEditAviable={isEditAviable} />
            <ModalChangeStatus id={idDate} isOpen={isOpenModalStatus} onClose={closeModal} />
            <ModalCancel message=" ¿Está seguro que desea cancelar la cita?" isOpen={isOpenModalCancel} onCancel={closeModalCancel} onConfirm={handleCancelDate} />
            <>
                <h1 className="text-3xl font-bold">Historial de citas medicas</h1>
                {
                    role_user === 'patient'
                        ? (
                            <p className="text-medium md:text-xl flex gap-x-2">Utilice {<FaEye size={24} color="black" />} para ver los detalles de su cita y {<MdCancel size={24} color="black" />} para cancelar la cita.  (Solo se pueden cancelar citas con 24 horas de anticipación)
                            </p>
                        ) : (
                            <p className="text-medium md:text-xl flex gap-x-2">Utilice {<FaEye size={24} color="black" />} para ver la cita, {<FaEdit size={24} color="black" />} para editar la cita, {<FaCalendar size={24} color="black" />} para reagendar la cita y {<FaUser size={24} color="black" />} para ver el perfil del paciente.
                            </p>

                        )
                }
                <p className="text-xl font-semibold ">Seleccione el estado de la cita para cambiarlo.</p>
                <div className=" h-[70vh] overflow-scroll mt-4">
                    <table className=" w-full">
                        <thead className=" border-b-1 h-12 sticky top-0 bg-secondaryColor border-gray-300 p-4 ">
                            <tr className="rounded-t-xl ">
                                <th>Paciente</th>
                                <th>Medico</th>
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
                                            <tr key={date.date.id} className="p-4 h-12 text-center hover:bg-gray-100 border-b-1 border-gray-200">

                                               <td>{date.patientName} {date.patientLastname}</td>
                                               <td>{date.medicName} {date.medicLastName}</td>  
                                               
                                               
                                                <td>{date.consultationReason}</td>
                                                <td>{date.day} - {date.hour}</td>
                                                <td>
                                                    <button onClick={() => openModalStatus(date.date.id)} disabled={role_user === 'patient'}>
                                                        <div className={` w-4 h-4 md:h-7 md:w-24 mx-auto 
                                                rounded-lg border-2 border-black ${date.date.status == 'Pendiente' ? 'bg-yellow-100 text-black border-yellow-400' : date.date.status == 'Confirmada' ? 'bg-green-100 text-black border-green-400' : 'bg-red-100 text-black border-red-400'}
                                                `}><p className="hidden md:block">{date.date.status}</p></div>
                                                    </button>
                                                </td>
                                                {
                                                    role_user === 'patient' ? (
                                                        <td className="flex justify-around items-center py-4">
                                                            <button onClick={() => openModal(date.date.id, false)}>
                                                                <FaEye size={24} color="black" />
                                                            </button>
                                                            <button disabled={new Date(date.day) <= new Date(dateToday)} onClick={() => openModalCancel(date.date.id)} >
                                                                <MdCancel size={24} color="black" />
                                                            </button>
                                                        </td>
                                                    ) : (
                                                        <td className="grid grid-cols-1 gap-y-1 md:flex justify-around items-center py-4">
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
                                                    )
                                                }
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
