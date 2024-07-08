'use client';
import DenyAcces from "@/components/ui/DenyAcces";
import Record from "@/components/data/Record";
import { useUserStore } from "@/store/userStorage";


export default function RecordPatient({params} : {params: {id: number}}){
    const {id} = params;
    const { id_user, role_user, clearUser } = useUserStore();
    console.log(role_user, id_user, id)
    if(role_user == 'patient' && id_user != id || role_user == ''){
        return(
            <div>
                <DenyAcces  />
            </div>
        )
    }
    return(
        <Record id={id} vista={'paciente'}/>
    )
}