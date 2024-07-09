"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { BsFillBackspaceFill } from "react-icons/bs";
import ModalSignin from './modal-sigin';
import { useUserStore } from '@/store/userStorage';
import { setSessionCookie } from '@/lib/actions';

import { useRouter } from 'next/navigation'
import Alert from './alert';

interface ModalLoginProps {
    isOpen: boolean;
    onClose: () => void;
}



const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, onClose }) => {
    const router = useRouter()
    const { setEmailUser, setIdUser, setRoleUser } = useUserStore();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isModalSigninOpen, setIsModalSigninOpen] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    const [messageAlert, setMessageAlert] = useState<string>('');
    const [isPositive, setIsPositive] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);


    const openAlertMessage = () => {
        setOpenAlert(true);
    };
    const closeAlertMessage = () => {
        setOpenAlert(!openAlert);
    };
    const handleClose = () => {
        onClose();
    };
    const openModalSignin = () => {
        setIsModalSigninOpen(true);
    };
    const closeModalSignin = () => {
        setIsModalSigninOpen(!isModalSigninOpen);
    };


    const fetchLogin = async (email: string, password: string) => {
        setLoginLoading(true);
        try {
            const response = await axios.post(`https://backend-plataforma.onrender.com/api/login`, {
                email: email,
                password: password
            });
            console.log(response.data);
            handleClose();
            setEmailUser(response.data.email);
            setIdUser(response.data.id);
            setRoleUser(response.data.role);
            await setSessionCookie(response.data.role);
            console.log(response.data.role)
            router.refresh();
            setLoginLoading(false);
        }
        catch (error) {
            setLoginLoading(false);
            setMessageAlert('Error al iniciar sesión, verifique sus credenciales');
            setIsPositive(false);
            openAlertMessage();
        };
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <ModalSignin isOpen={isModalSigninOpen} onClose={closeModalSignin} />
                    <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-70"></div>
                    {/* Contenido */}
                    <div className="z-20 h-[100%] md:h-[70%] w-[100%] md:w-[50%] p-4 mx-auto bg-white rounded-md shadow-lg grid md:grid-cols-3 gap-4">
                        <div className="hidden col-span-2 md:flex flex-col justify-center items-center p-3">
                            <img src={'https://static.vecteezy.com/system/resources/previews/015/773/865/original/illustration-of-the-group-of-medical-workers-health-professional-team-concept-illustration-vector.jpg'} alt="login" className="w-full h-full" />
                        </div>
                        <div className="col-span-1 flex flex-col w-[100%] h-[70%] md:h-[100%] p-10 md:p-1 ">
                            
                            <div className="flex justify-end">
                                <button onClick={handleClose}>
                                    <BsFillBackspaceFill size={35} color='black' />
                                </button>
                            </div>
                            <div className="flex flex-col justify-center my-auto items-center">
                                <img src={'https://res.cloudinary.com/dhcwjwpjw/image/upload/v1720488321/chrono/Isotipo.png'} alt="login" className="mb-4 w-[60%] h-[60%] md:w-[30%] md:h-[30%] rounded-full" />
                                <div className='text-black font-bold text-4xl md:text-2xl flex items-center mb-2'>Bienvenido</div>
                                <p className="text-slate-600 font-semibold text-lg md:text-sm mb-4">Ingresa tu email y contraseña para acceder a tu cuenta.</p>
                                <input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full"
                                    onChange={(event) => setEmail(event.target.value)} />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="p-2 mx-5 my-2 border border-gray-300 rounded-md text-black font-semibold w-full mb-4"
                                    onChange={(event) => setPassword(event.target.value)} />
                                <button disabled={loginLoading} className="bg-secondaryColor text-black p-2 m-2 rounded-md w-full font-bold" onClick={() => fetchLogin(email, password)}>{loginLoading ? 'Cargando...' : 'Iniciar Sesión'}</button>
                                <button className="bg-secondaryColor border-2 border-secondaryColor text-black p-2 m-2 rounded-md w-full font-bold" onClick={openModalSignin}>Registrarse</button>
                                <Alert message={messageAlert} isPositive={isPositive} isOpen={openAlert} onClose={closeAlertMessage} />

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default ModalLogin;