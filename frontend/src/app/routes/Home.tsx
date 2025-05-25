import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryWidget from "../../services/flight/components/PrimaryWidget";
import FeaturedWidget from "../../services/flight/components/FeaturedWidget";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden ">
            <div className="fixed inset-0 h-screen bg-[#fffffffc] blur-sm -z-10" />
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center scale-[80%]">
                <div className="space-y-10 w-full max-w-[900px]">
                    <FeaturedWidget/>
                    <PrimaryWidget/>
                </div>  
            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 190"><path fill="#4385f0" fill-opacity="1" d="M0,96L80,101.3C160,107,320,117,480,122.7C640,128,800,128,960,112C1120,96,1280,64,1360,48L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default Home;