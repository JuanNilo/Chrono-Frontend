'use client';
import CardOption from "@/components/ui/Card-Option";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SideNaviItem } from "@/types";
import { AiFillHome } from "react-icons/ai";
import { MdViewAgenda } from "react-icons/md";
import { title } from "process";
import { FaList, FaPlus, FaRegCalendar, FaRegUser, FaUserLock } from "react-icons/fa";
import DenyAcces from "@/components/ui/DenyAcces";
import { useUserStore } from "@/store/userStorage";



export default function Employee(){
    const { id_user, role_user } = useUserStore();

    const SIDENAV_ITEMS_EMPLOYEES = [
        {
            title: "Ver datos del medico",
            path: "/account",
            description: "Revisa y actualiza tus datos personales",
            icon: <FaRegUser size={34} color="black" />,
        },
        {
            title: "Historial Citas",
            path: "/record",
            description: "Revista y gestiona tus citas",
            icon: <FaRegCalendar size={34} color="black" />,
        },
        {
            title: "Agendar Cita",
            path: "/appointments",
            description: "Programa una nueva cita para tus pacientes.",
            icon: <FaPlus size={34} color="black" />,
        },
        {
            title: "Jornada Laboral",
            path: "/employee/workday",
            description: "Selecciona tus horarios de trabajo",
            icon: <FaList size={34} color="black" />,
        }
    ];
    
    const SIDENAV_ITEMS_SECRETARY = [
        {
            title: "Home",
            path: "/secretary",
            description: "Revista y gestiona tus citas",
            icon: <AiFillHome size={34} color="black" />,
        },
        {
            title: "Citas",
            path: "/secretary/appointments",
            description: "Revista y gestiona tus citas",
            icon: <MdViewAgenda size={34} color="black" />,
        },
        {
            title: "Citas",
            path: "/secretary/appointments",
            description: "Revista y gestiona tus citas",
            icon: <MdViewAgenda size={34} color="black" />,
        }
    ];
    const SIDENAV_ITEMS_CASE = role_user === 'employee' ? SIDENAV_ITEMS_EMPLOYEES :
    role_user === 'secretary' ? SIDENAV_ITEMS_SECRETARY : [];

    return(
        <div >

            {
                (role_user == 'employee' || role_user=="secretary") ? (
                    <div className="flex h-[80vh] md:h-[60vh] md:p-16 gap-y-10 w-[100%] md:w-[70%] mx-auto flex-wrap items-center justify-center  ">
                   {SIDENAV_ITEMS_CASE.map((item, index) => (
                            <CardOption key={index} title={item.title} path={item.path} description={item.description} icon={item.icon} />
                    ))}
                </div>):(
                    <DenyAcces/>
                )
            }
           
        </div>
    )
}