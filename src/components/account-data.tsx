import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogOutButton from "./Logout-button";
import CustomButton from "./custom-button";
import { TbLogin2 } from "react-icons/tb";
import { FaEdit, FaSave } from "react-icons/fa";
import axios from "axios";
import { useUserStore } from "@/store/userStorage";
import { deleteSessionCookie } from "@/lib/actions";

interface AccountDataProps {
    id: number;
    id_specialty: string | null;
    rut: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    category: string | null;
    date: string | null;
}

interface Patient {
    id: number;
    rut: string;
    email: string;
    name: string;
    password: string;
    lastname: string;
    category: string;
};
interface Employee {
    id: number;
    id_specialty: number;
    rut: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    date: string;

};

export default function AccountData({ id, id_specialty, rut, email, password, name, lastname, category, date }: AccountDataProps) {
    const router = useRouter();

    const { id_user, role_user, clearUser } = useUserStore();

    const [dataPatient, setDataPatient] = useState<Patient | null>(null);
    const [dataEmployee, setDataEmployee] = useState<Employee | null>(null);
    const [idAccount, setIdAccount] = useState<number | null>(id)
    const [idSpecialtyAccount, setIdSpecialtyAccount] = useState<string | null>(id_specialty)
    const [rutAccount, setRutAccount] = useState<string | null>(rut)
    const [emailAccount, setEmailAccount] = useState<string | null>(email)
    const [passwordAccount, setPasswordAccount] = useState<string | null>(password)
    const [nameAccount, setNameAccount] = useState<string | null>(name)
    const [lastnameAccount, setLastnameAccount] = useState<string | null>(lastname)
    const [categoryAccount, setCategoryAccount] = useState<string | null>(category)

    const [isEdit, setIsEdit] = useState<boolean>(true);

    const cerrarSesion = async () => {
        clearUser();
        await deleteSessionCookie();
        router.push('/')
        router.refresh();
    };

    const formatRut = (rut: string): string => {
        const cleanRut = rut.replace(/[^0-9kK]/g, '');
        const rutDigits = cleanRut.slice(0, -1);
        const rutVerifier = cleanRut.slice(-1).toUpperCase();
        const formattedRut = rutDigits
            .split('')
            .reverse()
            .map((digit, index) => (index % 3 === 0 && index !== 0 ? `${digit}.` : digit))
            .reverse()
            .join('');
        return `${formattedRut}-${rutVerifier}`;
    };

    const fetchEditData = async () => {
        if (rutAccount == '' || emailAccount == '' || passwordAccount == '' || nameAccount == '' || lastnameAccount == '') {

            alert('Todos los campos son obligatorios')
            return
        }
        try {
            const idUser = id_user;
            const rut = formatRut(rutAccount || '');
            const email = emailAccount || '';
            const password = passwordAccount || '';
            const name = nameAccount || '';
            const lastname = lastnameAccount || '';
            const category = dataPatient?.category || '';
            // http://backend-plataforna.onrender.com
            const response = await axios.put(`https://backend-plataforma.onrender.com/api/users/${idUser}`, {
                rut,
                email,
                password,
                name,
                lastname,
                category
            })
            console.log(response.data)
            console.log('Actualizado con exito', response.data)
            setIsEdit(!isEdit)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(id_user)
    }, [id_user]);
    return (
        <div className="h-[100%]">
            <div className="h-[20%] flex items-center justify-between ">
                <h1 className="text-3xl font-bold">Account Information</h1>

                {
                    isEdit ?
                        <button disabled={id_user == -1} onClick={() => setIsEdit(!isEdit)} className="flex justify-between items-center ml-4 bg-red-500 p-2 rounded-lg w-28 h-12 px-4">
                            <FaEdit size={28} color="white" />
                            <p className=" text-white font-bold">Edit</p>
                        </button>
                        :

                        <button onClick={fetchEditData} className="flex justify-between items-center ml-4 bg-green-500 p-2 rounded-lg w-28 h-12 px-4">
                            <FaSave size={24} color="white" />
                            <p className=" text-white font-bold">Save</p>
                        </button>
                }

            </div>

            <div className=" h-[60%]  flex flex-wrap gap-4 w-[100%] justify-between">



                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rut:</label>
                    <input disabled={isEdit} onChange={(e) => setRutAccount(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={rut} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input disabled={isEdit} type="text" onChange={(e) => setEmailAccount(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={email} required />
                </div>
                {/* Password */}
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input disabled={isEdit} type="password" onChange={(e) => setPasswordAccount(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={"*******"} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                    <input disabled={isEdit} type="text" id="first_name" onChange={(e) => setNameAccount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={name} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                    <input disabled={isEdit} type="text" id="first_name" onChange={(e) => setLastnameAccount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={lastname} required />
                </div>

                {category && <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category: </label>
                    <select disabled={isEdit} id="first_name" onChange={(e) => setCategoryAccount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required>
                        <option value="">{category || "Categoria"}</option>
                        <option value="Fonasa">Fonasa</option>
                        <option value="Isapre">Isapre</option>
                        <option value="Particular">Particular</option>
                    </select>
                </div>}

                {id_specialty && <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id specialty: </label>
                    <input disabled={isEdit} type="text" id="first_name" onChange={(e) => setIdSpecialtyAccount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={id_specialty || "especialidad"} required />
                </div>}


            </div>
            <div>
                <button onClick={cerrarSesion}><CustomButton location={"navbar"} text={"Cerrar sesion"} ><TbLogin2 size={25} color="white" /></CustomButton></button>
            </div>
        </div>
    )
}
