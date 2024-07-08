import Card from "../ui/Card";
import Image from "next/image";
export default function Services() {

    const cardInfo = [
        { title: "Previsiones", description: "Contamos con cobertura de Isapres y Fonasa", url: "https://cdn.discordapp.com/attachments/1244837964245368893/1244992632699093013/resume-review.png?ex=6657213e&is=6655cfbe&hm=0095fb3b29bffbae63ccd5a948a6c942244cf5ebd480737ee13bf47e363051e3&" },
        { title: "Procedimientos", description: "Contamos con profesionales en todas las areas de la salud", url: `url('/healtcare.png')` },
        { title: "Historial", description: "Puedes revisar todo tu historial clinico en un solo lugar", url: "https://cdn.discordapp.com/attachments/1244837964245368893/1244992632699093013/resume-review.png?ex=6657213e&is=6655cfbe&hm=0095fb3b29bffbae63ccd5a948a6c942244cf5ebd480737ee13bf47e363051e3&" },
    ]
    return (
        <div className="h-[100vh] bg-gradient-to-t from-white to-slate-100 pb-12">
            <div className="h-[86%] w-[100%] text-center z-10 py-24">

                <h2 className="text-4xl font-bold text-black">Nuestros servicios</h2>
                <p className="text-xl text-black">Contamos con un equipo de profesionales en todas las areas de la salud</p>
                {/* Card zone */}
                <div className="md:flex grid grid-cols-2 justify-center md:justify-between w-full md:w-[80%] mx-auto py-8 gap-y-2">
                    
                        <Card title={'Previsiones'} description={'Contamos con cobertura de Isapres y Fonasa'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto">
                                <Image src="https://res.cloudinary.com/dhcwjwpjw/image/upload/v1720400584/chrono/prevision.png" alt="Previsiones" layout="fill" objectFit="contain" />
                            </div>
                        </Card>
                        <Card title={'Procedimientos'} description={'Contamos con profesionales en todas las areas de la salud'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto">
                                <Image src="https://res.cloudinary.com/dhcwjwpjw/image/upload/v1720400588/chrono/procedimiento.png" alt="Procedimientos" layout="fill" objectFit="contain" />
                            </div>
                        </Card>
                        <Card title={'Historial'} description={'Puedes revisar todo tu historial clinico en un solo lugar'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto">
                                <Image src="https://res.cloudinary.com/dhcwjwpjw/image/upload/v1720400126/chrono/record.png" alt="Historial" layout="fill" objectFit="contain" />
                            </div>
                        </Card>
                        <Card title={"Nuestros equipo"} description={"Contamos con un equipo de profesionales en todas las areas de la salud"} >
                            <div className="flex justify-center items-center h-[70%] w-[50%] mx-auto">
                                <Image  src="https://res.cloudinary.com/dhcwjwpjw/image/upload/v1720400245/chrono/equipo.png" alt="Nuestros equipo" layout="fill" objectFit="contain" />
                            </div>
                        </Card>
                        
                </div>

            </div>
            
        </div>
    )
}