import { Children } from "react";

interface CardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function Card({ title, description, children}: CardProps){
    return(
        <div className="w-[23%] h-[50vh] bg-white p-4 rounded-md shadow-xl transform transition-transform duration-500 hover:scale-110 ">
            <h2 className="text-2xl font-bold">{title}</h2>
           {children}
            <p className="text-lg">{description}</p>
        </div>
    )
}