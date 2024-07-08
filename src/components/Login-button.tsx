import { TbLogin2 } from "react-icons/tb";

export default function LoginButton(location:any){
    return(
        <div className={`flex items-center justify-center h-12 w-50 ${location == 'main' ? 'bg-red-400 absolute  bottom-0 ' : 'bg-primaryColor p-2 '} rounded-lg m-2`} >
        <div className="flex flex-row">
            <TbLogin2 size={25} color="white" />
            <div className="mx-2 text-lg font-semibold text-white">Iniciar Sesión</div>
        </div>
    </div>
    )
}

