import Card from "../ui/Card";

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
                <div className="flex justify-between w-[80%] mx-auto py-8">
                    
                        <Card title={'Previsiones'} description={'Contamos con cobertura de Isapres y Fonasa'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1244837964245368893/1258480997532438588/health-insurance.png?ex=66883343&is=6686e1c3&hm=afa7db2ecaba8162c24e1e08cc63515d0aaf24adc647cf06c472d6369411f29a&')`}}></div>
                        </Card>
                        <Card title={'Procedimientos'} description={'Contamos con profesionales en todas las areas de la salud'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1244837964245368893/1258480997868241077/pregnancy.png?ex=66883343&is=6686e1c3&hm=2584ecc2f15d58e1763621486d603448d42de00c3fe02ac6b22dcda91b9f6a31&')`}}></div>
                        </Card>
                        <Card title={'Historial'} description={'Puedes revisar todo tu historial clinico en un solo lugar'} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1244837964245368893/1258480948966723614/healthcare.png?ex=66883337&is=6686e1b7&hm=ed1fb3931f1e7d0bac27cf1edaf94fa90ac7c630b6090a130e041789f8d65c9d&')`}}></div>
                        </Card>
                        <Card title={"Nuestros equipo"} description={"Contamos con un equipo de profesionales en todas las areas de la salud"} >
                            <div className="flex justify-center items-center h-[70%] w-[80%] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1244837964245368893/1258481123307290715/work-with-the-best.png?ex=66883361&is=6686e1e1&hm=907d5bfd7b27e0cf67d65d5f2ffc1e602215c3fca2c16843962f6f8020dd052e&')`}}></div>
                        </Card>
                        
                </div>

            </div>
            
        </div>
    )
}