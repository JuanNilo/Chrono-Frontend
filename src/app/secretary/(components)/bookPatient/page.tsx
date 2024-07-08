'use client'
import { useEffect, useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Calendar } from "@nextui-org/calendar";
import axios from "axios";
import { useUserStore } from "@/store/userStorage";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert";

interface Speciality {
    id: number;
    name: string;
}
interface Employees {
    id: number;
    name: string;
    lastname: string;
}
interface Schedule {
    id: number;
    initial_hour: string;
}
interface Reason {
    id: number;
    name: string;
}

function formatearRut(rut: string): string {
    if (rut.length !== 9) {
        console.log('Rut invalido');
    }
    const rutFormateado = rut.replace(/^(\d{2})(\d{3})(\d{3})(\d)$/, '$1.$2.$3-$4');
    return rutFormateado;
}

export default function AppointmentsPage() {
    const [messageAlert, setMessageAlert] = useState<string>('');
    const [isPositive, setIsPositive] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const openAlertMessage = () => {
        setOpenAlert(true);
    };
    const closeAlertMessage = () => {
        setOpenAlert(!openAlert);
    };

    const router = useRouter();
    const { id_user, role_user } = useUserStore();

    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [employees, setEmployees] = useState<Employees[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [reason, setReason] = useState<Reason[]>([]);

    const [IdspecialitySelect, setIdSpecialitySelect] = useState<string>('');
    const [IdDoctorSelect, setIdDoctorSelect] = useState<number>(0);
    const [dateSelected, setDateSelected] = useState(today(getLocalTimeZone()));
    const [IdScheduleSelect, setIdScheduleSelect] = useState<number>(0);
    const [IdReasonSelect, setIdReasonSelect] = useState<number>(0);
    const [rutUser, setRutUser] = useState<string>('');
    const [idUser, setIdUser] = useState<number>(0);

    async function setRutPatient() {
        if (role_user === 'patient') {
            try {
                const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${id_user}`);
                setRutUser(response.data.rut);
                setIdUser(response.data.id);
            }
            catch (error) {
                console.log(error);
                setMessageAlert('Error al obtener el rut del paciente, si no es paciente, registre un nuevo usuario');
                setIsPositive(false);
                openAlertMessage();
            }
        }
    }

    const fetchEspeciality = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/specialities/medics`);
            setSpecialities(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/employees/speciality/${IdspecialitySelect}`);
            setEmployees(response.data);
            console.log(response.data);
            console.log(IdspecialitySelect);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchSchedule = async () => {
        console.log(IdDoctorSelect, dateSelected.toString());
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/schedules/employee/${IdDoctorSelect}/date/${dateSelected.toString()}`);
            console.log(response.data);
            setSchedules(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchReason = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/consultation-reasons`);
            setReason(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchAppointment = async (IdScheduleSelect: number, idUser: number, IdDoctorSelect: number, IdReasonSelect: number) => {
        setButtonLoading(true);
        fetchRutUser();
        console.log(idUser);
        if (idUser === 0) {

        } else {
            try {
                console.log(IdScheduleSelect, idUser, IdDoctorSelect, IdReasonSelect);
                const response = await axios.post(`https://backend-plataforma.onrender.com/api/dates`, {
                    time_id: IdScheduleSelect,
                    patient_id: idUser,
                    officer_id: IdDoctorSelect,
                    process: '??',
                    status: 'Pendiente',
                    id_consultation_reason: IdReasonSelect,
                });
                console.log(response.data);
                setMessageAlert('Cita registrada correctamente, en su correo encontrará la información de la cita');
                setIsPositive(true);
                openAlertMessage();
                router.refresh();
                setButtonLoading(false);
            }
            catch (error) {
                console.log(error);
                setMessageAlert('Error al registrar cita, intente nuevamente');
                setIsPositive(false);
                openAlertMessage();
                setButtonLoading(false);
            }
        }
    }

    const fetchRutUser = async () => {
        console.log(rutUser);
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/rut/${rutUser}`);
            console.log(response.data.id);
            setIdUser(response.data.id);
        }
        catch (error) {
            console.log(error);
            setMessageAlert('Paciente no encontrado');
            setIsPositive(false);
            openAlertMessage();
        }
    }

    const fetchDataPatient = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${id_user}`);
            console.log(response.data);
            setRutUser(response.data.rut);
            setIdUser(id_user);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEspeciality();
        setRutPatient();
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [IdspecialitySelect]);

    useEffect(() => {
        fetchSchedule();
    }, [IdDoctorSelect, dateSelected]);

    useEffect(() => {
        fetchReason();
    }, [IdScheduleSelect]);

    useEffect(() => {
        if (rutUser !== '') {
            fetchRutUser();
        }
    }, [rutUser]);

    useEffect(() => {
        if (role_user === 'patient') {
            fetchDataPatient();
            setIdUser(id_user);
        }
    }, [role_user]);

    return (
        <div>
            <div className="px-10">
                <Alert message={messageAlert} isPositive={isPositive} isOpen={openAlert} onClose={closeAlertMessage} />
            </div>
            <h1 className="text-center text-3xl font-bold mt-10">Agendar Cita Medica</h1>
            <div className="flex flex-row-2 px-40">
                <div className="flex flex-col py-10 px-10 w-[70%]">
                    <h2 className="text-xl font-bold mb-2">Elige una especialidad</h2>
                    <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg px-4"
                        value={IdspecialitySelect}
                        onChange={(e) => setIdSpecialitySelect(e.target.value)}
                    >
                        <option value="" disabled>Seleccione una especialidad</option>
                        {specialities.map((specialities, index) => (
                            <option key={index} value={specialities.id}>{specialities.name}</option>
                        ))}
                    </select>

                    <h2 className="text-xl font-bold mb-2 mt-5">Elige al especialista</h2>
                    <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg px-4"
                        value={IdDoctorSelect}
                        onChange={(e) => setIdDoctorSelect(Number(e.target.value))}
                        disabled={IdspecialitySelect === '' ? true : false}
                    >
                        <option value="" disabled>Seleccione a un especialista</option>
                        {employees.map((employees, index) => (
                            <option key={index} value={employees.id}>{employees.name} {employees.lastname}</option>
                        ))}
                    </select>

                    <h2 className="text-xl font-bold mb-2 mt-5">Elige una hora</h2>
                    <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg px-4"
                        value={IdScheduleSelect}
                        onChange={(e) => setIdScheduleSelect(Number(e.target.value))}
                        disabled={IdDoctorSelect === 0 ? true : false}
                    >
                        <option value="" disabled>Seleccione una hora</option>
                        {schedules.map((schedules, index) => (
                            <option key={index} value={schedules.id}>{schedules.initial_hour}</option>
                        ))}
                    </select>

                    <h2 className="text-xl font-bold mb-2 mt-5">Ingrese el motivo de la consulta</h2>
                    <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg px-4"
                        value={IdReasonSelect}
                        onChange={(e) => setIdReasonSelect(Number(e.target.value))}
                        disabled={IdScheduleSelect === 0 ? true : false}
                    >
                        <option value="" disabled>Seleccione un motivo</option>
                        {reason.map((reason, index) => (
                            <option key={index} value={reason.id}>{reason.name}</option>
                        ))}
                    </select>

                    {role_user != 'patient' ? (
                        <div>
                            <h2 className="text-xl font-bold mb-2 mt-5">Ingrese el rut de usuario (sin puntos ni guión)</h2>
                            <div className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg drop-shadow-lg">
                                <input type="text"
                                    className="h-full w-full text-gray-700 px-4 py-2 rounded-lg"
                                    placeholder="Ingrese el rut de usuario"
                                    disabled={IdReasonSelect === 0 ? true : false}
                                    onBlur={(e) => { setRutUser(formatearRut(e.target.value)) }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="flex flex-col py-10 px-10 w-[50%]">
                    <h2 className="text-xl font-bold mb-2">Elige una fecha</h2>
                    <Calendar style={{ height: 460 }} aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())}
                        value={dateSelected}
                        color="success"
                        onChange={setDateSelected}
                        isDisabled={IdDoctorSelect === 0 ? true : false}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-1">
                <button
                    className="bg-primaryColor text-white font-bold text-xl rounded h-[5vh] w-[79%]"
                    disabled={IdDoctorSelect === 0 || IdspecialitySelect === '' || IdScheduleSelect === 0 || IdReasonSelect === 0 || buttonLoading ? true : false}
                    onClick={() => { fetchAppointment(IdScheduleSelect, idUser, IdDoctorSelect, IdReasonSelect) }}
                >Registrar Cita Medica</button>
            </div>
        </div>
    )
}