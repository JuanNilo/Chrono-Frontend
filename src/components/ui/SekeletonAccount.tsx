import CustomButton from "@/components/custom-button";
import { FaSave } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

export default function LoadingAccount() {
    return (
        <div>
        <div className="bg-white w-[80%] h-[80vh] p-12 mx-auto my-auto rounded-lg drop-shadow-lg">
            <div className="h-[100%]">
        <div className="h-[100%]">
            <div className="h-[20%] flex items-center justify-between ">
                <h1 className="text-3xl font-bold">Account Information</h1>
              
                
                    
                <button className="flex justify-between items-center ml-4 bg-gray-300 p-2 rounded-lg w-28 h-12 px-4">
                </button> 
              

            </div>

            <div className=" h-[60%]  flex flex-wrap gap-4 w-[100%] justify-between">

            

                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rut:</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={''} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={''} required />
                </div>
                {/* Password */}
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input  type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={"*******"} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name:</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={''} required />
                </div>
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name:</label>
                    <input type="text" id="first_name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={''} required />
                </div>
                
                <div className="w-full md:w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category: </label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder={''} required />
                </div>
                
            </div>
            <div>
                <button ><CustomButton location={"navbar"} text={"Cargando..."} ><TbLogin2 size={25} color="white" /></CustomButton></button>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}