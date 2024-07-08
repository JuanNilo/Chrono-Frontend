'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Patient{
    id: number;
    rut: string;
    email: string;
    name: string;
    password: string;
    lastname: string;
    category: string;
};

export default function DataUser({id}: {id:number}){
    const [dataPatient, setDataPatient] = useState<Patient | null>(null);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${id}`);
            const PatientData: Patient = response.data;
            setDataPatient(PatientData);
            console.log(PatientData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className='border-b-1 border-black '>
            <h1 className="text-3xl font-bold">Informacion del usuario</h1>
            <section className='flex justify-between'>
                <div className=' flex gap-x-2'>
                    <p className='font-bold'>Nombre: </p> 
                    <div>
                        {dataPatient?.name} {dataPatient?.lastname}
                    </div>
                </div>
                <div className=' flex gap-x-2'>
                    <p className='font-bold'>Rut: </p> {dataPatient?.rut}
                </div>
                <div className=' flex gap-x-2'>
                    <p className='font-bold'>Email: </p> {dataPatient?.email}
                </div>
            </section>
        </div>
    )
}