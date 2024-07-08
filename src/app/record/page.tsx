'use client'
import DenyAcces from "@/components/ui/DenyAcces";
import Record from "@/components/data/Record";
import { useUserStore } from "@/store/userStorage";

export default function Page(){
    const { role_user, id_user } = useUserStore();
    if(role_user == '' ){
        return(
            <div>
                <DenyAcces />
            </div>
        )
    }
    console.log(role_user)
    if(role_user =='employee' ){
        return(
            <div>
              <Record id={id_user} vista={'medico'}/>
            </div>
        )
    }
    return(
        <div>
             <Record id={id_user} vista={'usuario'}/>
        </div>
    )
}