import DataUser from "./DataUser";
import ListDates from "./ListDates";

export default function Record({id, vista}: {id: number, vista:string}){
    
    return(
        <main className=" p-2 md:p-7">
            {vista == 'usuario' && <DataUser id={id}/>}
            
            <div className="h-[70vh] ">
                <ListDates id={id} vista={vista}/>
            </div>
        </main>
    )
}