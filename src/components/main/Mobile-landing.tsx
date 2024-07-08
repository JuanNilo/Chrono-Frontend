// import signin from '../../assets/signin.png';
import { BiSolidClinic } from "react-icons/bi";
import Wave from "../ui/Wave";
import { } from "./../../../public/signin.png";
import Image from 'next/image';
import { FaBell, FaClipboardList } from "react-icons/fa";
import Card from "../ui/Card";
export default function MobileLanding() {
    return (
        <>
        <div className="">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
<path fill="#75f7c8" fillOpacity="1" d="M0,64L34.3,53.3C68.6,43,137,21,206,26.7C274.3,32,343,64,411,90.7C480,117,549,139,617,133.3C685.7,128,754,96,823,96C891.4,96,960,128,1029,128C1097.1,128,1166,96,1234,74.7C1302.9,53,1371,43,1406,37.3L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
</svg>
</div>
        <section className="h-[80vh] bg-secondaryColor text-center justify-center p-16">
            
            <div className="h-[100%]">
                <h1 className="text-4xl font-bold">Descarga nuestra nueva app para Android y IOS</h1>
                <p className="text-lg">¡No te pierdas de nada!</p>
                <div className="flex h-[70%]">
                   
                <Card title={'Link de Descarga'} description={'Descarga nuestra app de Android usando este QR.'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1244837964245368893/1258501358060048464/Captura_de_pantalla_2024-07-04_a_las_15.14.33.png?ex=66884639&is=6686f4b9&hm=293438cf0515bfc839b93fd284cd19b4f673083f4fd1102fdd2e8686963b10b0&')`}}></div>
                        </Card>
                    <div className="flex flex-wrap justify-center items-center h-[100%] w-[40%] mx-auto bg-cover bg-center">
                        <div className="w-[100%] rounded-xl drop-shadow-lg h-20 bg-white p-10 flex items-center gap-x-4 hover:bg-slate-50  transform transition-transform duration-500 hover:scale-110">
                            <BiSolidClinic size={40} />
                            <p className="text-xl font-bold">Agenda citas en todas partes.</p>
                        </div>
                        <div className="w-[100%] rounded-xl drop-shadow-lg h-20 bg-white p-10 flex items-center gap-x-4 hover:bg-slate-50  transform transition-transform duration-500 hover:scale-110">
                            <FaClipboardList size={40} />
                            <p className="text-xl font-bold">Revisa tu historial clinico.</p>
                        </div>
                        <div className="w-[100%] rounded-xl drop-shadow-lg h-20 bg-white p-10 flex items-center gap-x-4 hover:bg-slate-50  transform transition-transform duration-500 hover:scale-110">
                            <FaBell size={40} />
                            <p className="text-xl font-bold">Recibe notificaciones de tus citas.</p>
                        </div>
                    </div>
                </div>
                <div>
    <a href="https://expo.dev/artifacts/eas/pfRbcsD7iDT3bFFB4YFUgR.apk" target="_blank" rel="noopener noreferrer">
        <button className="bg-white hover:bg-emerald-400 text-black font-bold py-4 px-6 border-b-4  border-emerald-500 hover:border-emerald-800 rounded">Descargar</button>
    </a>
</div>
         </div>
        </section>
       
        </>
    )
}