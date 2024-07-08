import Wave from "../ui/Wave";

export default function LandingPage(){
    return (
        <div className="h-[60vh] bg-slate-100 "  >
            <div className="h-[100%] flex " >
                <aside className=" h-[100%] w-[50%]  flex flex-wrap justify-center p-12 gap-y-4">
                    <p className="text-5xl font-bold ">Tu salud es nuestra prioridad.</p>
                    <p className="text-2xl"> Todos los servicios que necesitas en un solo lugar.</p>
                </aside>
                <main
        className="flex flex-col  items-center justify-center h-[100%] w-[100%] bg-cover bg-center rounded-br-[50%] rounded-tl-[25%] drop-shadow-2xl"
        style={{ backgroundImage: `url('https://d51h1y0hva8v.cloudfront.net/images/default-source/slider-new-home/copago_junio_desktop.jpg?sfvrsn=b18b75d3_1')` }}
      >
      </main> 
            </div>
        </div>
    );
}