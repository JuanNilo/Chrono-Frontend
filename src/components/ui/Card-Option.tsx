import Link from "next/link";


export default function CardOption({title, description, icon, path}:{title:string, description:string, icon:any, path:string}){
    return(
        <Link href={path} className="w-[100%] md:w-[35%] h-[20vh] md:h-[30vh] bg-white  hover:cursor-pointer  transform transition-transform duration-500 hover:scale-110 flex md:flex-col justify-around px-6 md:justify-center 
         mx-auto items-center  md:rounded-lg drop-shadow-lg text-center gap-y-5">
            <div className="flex justify-center items-center scale-150">
                {icon}
            </div>
            <div className="w-[80%]">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p>{description}</p>
            </div>
        </Link>
    )
}