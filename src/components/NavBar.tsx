"use client";
import { useEffect, useState } from "react";
import LoginButton from "./Login-button";
import ModalLogin from "./modal-login";
import { TbLogin2, TbUserFilled } from "react-icons/tb";
import { usePathname, useRouter } from 'next/navigation'
import { SIDENAV_ITEMS, SIDENAV_ITEMS_EMPLOYEES, SIDENAV_ITEMS_PATIENTS, SIDENAV_ITEMS_SECRETARY } from "@/constants";
import { SideNaviItem } from "@/types";
import Link from "next/link";
import { MdOutlineLocalHospital, MdTimer } from "react-icons/md";
import CustomButton from "./custom-button";
import { useUserStore } from "@/store/userStorage";
import { LuTimerReset } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

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
        <nav className="w-[100%] h-14 bg-secondaryColor flex justify-center items-center p-10">
            <ModalLogin isOpen={isOpenModal} onClose={closeModalLogin} />
            <div className="w-full flex justify-between ">
                <Link href="/">
                    <div className={`flex items-center justify-center h-12 w-50 rounded-lg m-2 `} >
                        <div className="flex flex-row items-center">
                            <div>
                                <LuTimerReset size={34} color="black" />
                            </div>
                            <div className="hidden md:block mx-2 text-lg font-semibold text-black">CHRONO</div>
                        </div>
                    </div>
                </Link>
                {/* Opciones */}
                {
                    id_user != -1 && (

                        <div className="flex">
                            {SIDENAV_ITEMS_CASE.map((item: SideNaviItem, index: number) => (
                                <div key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`flex flex-row items-center md:px-6 h-12 w-50 rounded-lg m-2`}
                                    >
                                        <CustomButton location={"navbar"} text={item.title}>
                                            <div className="flex items-center justify-center">{item.icon}</div>
                                        </CustomButton>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                }
                <div>
                    {id_user != -1 ?
                        (

                            <div className="flex">

                                <button onClick={() => { router.push('/account') }} className="flex items-center justify-center h-12 rounded-lg m-2">
                                    <FaUserCircle size={34} color="black" />
                                </button>
                            </div>

                        ) :
                        // Si el usuario no esta logeado
                        (<div className="flex justify-end">
                            <button onClick={openModalLogin}>
                                <CustomButton location={"navbar"} text={"Iniciar Sesión"} >
                                    <TbLogin2 size={34} color="black" />
                                </CustomButton>
                            </button>
                        </div>

                        )}
                </div>
            </div>
        </nav>
    );
}

