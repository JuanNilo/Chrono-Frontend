'use client'
import { TbLogin2 } from "react-icons/tb";

export default function LogOutButton(){
    return(
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-12 w-50 bg-blue-500 rounded-lg m-2">
        <div className="flex flex-row">
            <TbLogin2 size={25} color="white" />
            <div className="mx-2 text-lg font-semibold text-white">Cerrar Sesión</div>
        </div>
    </div>
    )
}