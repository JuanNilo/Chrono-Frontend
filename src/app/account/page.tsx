'use client';
import NavBar from "@/components/NavBar";
import AccountData from "@/components/account-data";
import axios from "axios";
import React, { Suspense, use, useEffect, useState } from "react";

import { useUserStore } from "@/store/userStorage";
import LoadingAccount from "./loading";

interface Patient {
    id: number;
    rut: string;
    email: string;
    name: string;
    password: string;
    lastname: string;
    category: string;
};
interface Employee {
    id: number;
    id_specialty: number;
    rut: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    date: string;

};

export default function AccountPage (){

    const { id_user, role_user } = useUserStore();
    console.log(id_user);
    const [dataPatient, setDataPatient] = useState<Patient | null>(null);
    const [dataEmployee, setDataEmployee] = useState<Employee | null>(null);

    const fetchPatient = async () => {
        try {
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/users/${id_user}`);
            const PatientData: Patient = response.data;
            setDataPatient(PatientData);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchEmployee = async () => {
        try {

    console.log(id_user)
            const response = await axios.get(`https://backend-plataforma.onrender.com/api/employees/${id_user}`);
            const EmployeeData: Employee = response.data;
            setDataEmployee(EmployeeData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(role_user);
        if (role_user === 'patient') {
            fetchPatient();
        } else {
            fetchEmployee();
        }

    }, [id_user]);
    return (
        <div className="my-5">
            {/* Quiero renderizar el componente SkeletonAccount si la data aun no ha sido cargada */}
            {dataPatient || dataEmployee ?   (
            <div className="bg-white w-[80%] h-[80vh] p-12 mx-auto my-auto rounded-lg drop-shadow-lg">
                <div className="h-[100%]">
                    {dataPatient ? (
                        <AccountData
                            id={dataPatient.id}
                            id_specialty={null}
                            rut={dataPatient.rut}
                            email={dataPatient.email}
                            password={dataPatient.password}
                            name={dataPatient.name}
                            lastname={dataPatient.lastname}
                            category={dataPatient.category}
                            date={null}
                        />
                    ) : dataEmployee ? (
                        <AccountData
                            id={dataEmployee.id}
                            id_specialty={dataEmployee?.id_specialty ? dataEmployee.id_specialty.toString() : null}
                            rut={dataEmployee.rut}
                            email={dataEmployee.email}
                            password={dataEmployee.password}
                            name={dataEmployee.name}
                            lastname={dataEmployee.lastname}
                            category={null}
                            date={dataEmployee.date}
                        />
                    ) : null}
                </div>
            </div>) : <LoadingAccount />}
        </div>
    );

};
