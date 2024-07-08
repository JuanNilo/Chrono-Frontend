import { Children } from "react";

interface CardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function Card({ title, description, children}: CardProps){
    return(
        <div className=" w-[80%] md:w-[22%] h-[35vh] md:h-[55vh] bg-white p-4 rounded-md md:shadow-xl shadow-md transform transition-transform duration-500 md:hover:scale-110 ">
            <h2 className="text-2xl font-bold">{title}</h2>
           {children}
            <p className="hidden md:block text-lg">{description}</p>
        </div>
    )
}