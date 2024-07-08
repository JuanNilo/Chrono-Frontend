import LandingPage from "./LandingPage";
import MobileLanding from "./Mobile-landing";
import Services from "./Services";

export default function MainPage(){
    return(
        <div className=" w-[100%]">
            <LandingPage/>
            <Services />
            <MobileLanding/>
        </div>
    )
}