"use client";
import { useEffect, useState } from "react";
import LoginButton from "./Login-button";
import ModalLogin from "./modal-login";
import { TbLogin2, TbUserFilled } from "react-icons/tb";
import { usePathname, useRouter } from 'next/navigation'
import { SIDENAV_ITEMS, SIDENAV_ITEMS_EMPLOYEES, SIDENAV_ITEMS_PATIENTS, SIDENAV_ITEMS_SECRETARY } from "@/constants";
import { SideNaviItem } from "@/types";
import Link from "next/link";
import { MdOutlineLocalHospital } from "react-icons/md";
import CustomButton from "./custom-button";
import { useUserStore } from "@/store/userStorage";

export default function NavBar() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const router = useRouter();
    const pathname = usePathname();


    const openModalLogin = () => {
        setIsOpenModal(true);
    };

    const closeModalLogin = () => {
        setIsOpenModal(!isOpenModal);
    };

    const { id_user, email_user, role_user, clearUser } = useUserStore();

    const handleLogOut = () => {
        clearUser();
        router.push('/');
    }

    console.log(id_user)
    console.log(email_user)
    const SIDENAV_ITEMS_CASE = role_user === 'employee' ? SIDENAV_ITEMS_EMPLOYEES :
        role_user === 'secretary' ? SIDENAV_ITEMS_SECRETARY :
            role_user === 'patient' ? SIDENAV_ITEMS_PATIENTS : SIDENAV_ITEMS;


    return (
        <nav className="w-[100%] h-14 bg-secondaryColor flex justify-between items-center p-10">
            <ModalLogin isOpen={isOpenModal} onClose={closeModalLogin} />
            <Link href="/">
                <CustomButton location={"navbar"} text={"Centro Medico"} >
                    <MdOutlineLocalHospital size={30} color="White" />
                </CustomButton>
            </Link>
            <div className="w-[70%]   ">
                {id_user != -1 ? 
                    // Si el usuario esta logeado
                (
                    <div className="flex   items-center justify-between">
                        {SIDENAV_ITEMS_CASE.map((item: SideNaviItem, index: number) => (
                            <div key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`flex flex-row items-center md:px-6 h-12 w-50 rounded-lg m-2`}
                                >
                                    <div className="flex items-center justify-center">{item.icon}</div>
                                    <div className="mx-2 text-lg font-semibold text-zinc-900">{item.title}</div>
                                </Link>
                            </div>
                        ))}
                        {/* Boton de usuario y cerrar sesion */}
                        <div className="flex">

                            <button onClick={() => { router.push('/account') }} className="flex items-center justify-center h-12 p-2 bg-primaryColor rounded-lg m-2">
                                <CustomButton location={"navbar"} text={email_user}>
                                    <TbUserFilled size={25} color="white" />
                                </CustomButton>
                            </button>
                            <button onClick={handleLogOut} className="flex items-center justify-center h-12 p-2 bg-primaryColor rounded-lg m-2">

                                <TbLogin2 size={25} color="white" />
                            </button>
                        </div>

                    </div>

                ) : 
                // Si el usuario no esta logeado
                (<div className="flex justify-end">
                        <button onClick={openModalLogin}>
                            <CustomButton location={"navbar"} text={"Iniciar Sesión"} >
                                <TbLogin2 size={25} color="white" />
                            </CustomButton>
                        </button>
                    </div>

                )}
            </div>
        </nav>
    );
}

