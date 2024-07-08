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
interface reason {
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
    const [reason, setReason] = useState<reason[]>([]);

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
    }, []);
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
            <div className="flex flex-row-3 px-40 p-4">
                <div className=" w-[100%] grid grid-cols-3 gap-x-4">
                    {/* Seleccion especialdiad y doctor */}
                    <section className="flex flex-wrap py-6 justify-center items-center bg-white rounded-md px-3 border-1 border-gray-200">
                    <p className="font-semibold">Seleccione la especialdiad y el medico que desea agendar su cita</p>
                    <div className="flex-wrap w-[80%]">

                        <p className="text-lg font-semibold mb-2">Seleccione la especialidad:</p>
                        <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg border-1 border-black px-4"
                            onChange={(e) => setIdSpecialitySelect(e.target.value)}
                        >
                            <option defaultValue="" disabled selected>Seleccione una especialidad</option>
                            {specialities.map((specialities, index) => (
                                <option key={index} value={specialities.id}>{specialities.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-[80%]">
                        <p className="text-lg font-semibold mb-2 mt-5">Elige al especialista:</p>
                        <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg border-1 border-black px-4"
                            onChange={(e) => setIdDoctorSelect(Number(e.target.value))}
                            disabled={IdspecialitySelect === '' ? true : false}
                        >
                            <option defaultValue="" disabled selected>Seleccione a un especialista</option>
                            {employees.map((employees, index) => (
                                <option key={index} value={employees.id}>{employees.name} {employees.lastname}</option>
                            ))}
                        </select>
                    </div>
                    </section>
                {/* Seccion 2: Calendario */}
                <div className="flex flex-col bg-white border-1 rounded-md p-4 border-slate-200 ">
                    <p className="font-semibold mb-2">
                        Seleccione una fecha para su cita
                    </p>
                    <Calendar  aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())}
                        value={dateSelected}
                        color="foreground"
                        onChange={setDateSelected}
                        isDisabled={IdDoctorSelect === 0 ? true : false}
                    />
                </div>
                {/* Seccion 3: motivo y hora */}
                <section className=" bg-white border-1 border-slate-200 rounded-md p-3 flex flex-wrap justify-center items-center">                    
                    <div className="w-[80%]">
                        <p className="text-lg font-semibold mb-2 mt-5">Seleccione una hora:</p>
                        <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg border-1 border-black px-4"
                            onChange={(e) => setIdScheduleSelect(Number(e.target.value))}
                            disabled={dateSelected.toString() === '' || IdDoctorSelect === 0 ? true : false}
                        >
                            <option defaultValue="" disabled selected>Seleccione una hora</option>
                            {schedules.map((schedules, index) => (
                                <option key={index} value={schedules.id}>{schedules.initial_hour}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[80%]">
                    <p className="text-lg font-semibold mb-2 mt-5">Seleccione el motivo:</p>
                    <select className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg border-1 border-black px-4"
                        onChange={(e) => setIdReasonSelect(Number(e.target.value))}
                        disabled={IdScheduleSelect === 0 ? true : false}
                    >
                        <option defaultValue="" disabled selected>Seleccione un motivo</option>
                        {reason.map((reason, index) => (
                            <option key={index} value={reason.id}>{reason.name}</option>
                        ))}
                    </select>
                    </div>

                    {role_user != 'patient' ? (
                        <div className="w-[80%]">
                            <p className="text-lg font-semibold mb-2 mt-5">Ingrese el rut de usuario</p>
                            <div className="bg-white w-[100%] h-[5vh] mx-auto rounded-lg border-1 border-black ">
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

</section>  
                </div>
                
            </div>
            <div className="flex justify-center mt-1">
                <button
                    className="bg-primaryColor text-white font-bold text-xl rounded h-[5vh] w-[79%]"
                    disabled={IdDoctorSelect === 0 || IdspecialitySelect === '' || IdScheduleSelect === 0 || IdReasonSelect === 0 || buttonLoading ? true : false}
                    onClick={() => { fetchAppointment(IdScheduleSelect, idUser, IdDoctorSelect, IdReasonSelect) }}
                >
                    {buttonLoading ? 'Cargando...' : 'Agendar Cita'}
                </button>
            </div>
        </div>
    )
}


