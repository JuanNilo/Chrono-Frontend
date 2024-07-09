import { Icon } from "@iconify/react";
import { SideNaviItem } from "./types";
import { AiFillHome } from "react-icons/ai";
import { MdViewAgenda } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { BsFilePersonFill } from "react-icons/bs";
import { useUserStore } from "@/store/userStorage";
import { BiMenu, BiPlus, BiPlusCircle, BiSolidPlusCircle } from "react-icons/bi";



export const SIDENAV_ITEMS: SideNaviItem[] = [


];
export const SIDENAV_ITEMS_PATIENTS: SideNaviItem[] = [
    
    {
        title: "Agendar Cita",
        path: "/appointments",
        icon: <BiSolidPlusCircle size={34} color="black"/>,
    },
    {
        title: "Historial Clinico",
        path: '/record/',
        icon: <FaHistory size={34} color="black" />,
    },
];
export const SIDENAV_ITEMS_EMPLOYEES: SideNaviItem[] = [
    {
        title: "Menu empleado",
        path: "/employee",
        icon: <BiMenu size={34} color="black"/>,
    },
    {
        title: "Agendar cita",
        path: "/appointments",
        icon: <BiSolidPlusCircle size={34} color="black"/>,
    }
];
export const SIDENAV_ITEMS_SECRETARY: SideNaviItem[] = [
    {
        title: "Home",
        path: "/secretary",
        icon: <AiFillHome size={34} color="black" />,
    },
    {
        title: "Citas",
        path: "/appointments",
        icon: <BiSolidPlusCircle size={34} color="black"/>,
    },
    {
        title: "Personal",
        path: "/secretary/employees",
        icon: <BsFilePersonFill size={34} color="black" />,
    }
];