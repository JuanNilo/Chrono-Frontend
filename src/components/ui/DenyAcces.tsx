import { FaUserLock } from "react-icons/fa";
import CardOption from "./Card-Option";


export default function DenyAcces(){
    return(
        <div className="flex h-[60vh]  justify-center items-center">
        <CardOption title="No hay datos" description="Acceso solo gente autorizada. " path={'/'} icon={<FaUserLock size={34}/>} />
    </div>
    )
}