import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<string>(localStorage.getItem("currentUser") || "");

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden ">
            <div className="fixed inset-0 h-screen bg-neutral-100 blur-sm -z-10" />
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-15 pb-25">
                <div className="font-semibold">
                    <h1 className="inline text-4xl text-center text-neutral-700">Welcome, </h1>
                    <h1 className="inline text-4xl text-center text-neutral-800 font-bold">{currentUser}</h1>
                </div>

                
                <div className="w-full max-w-[600px] space-y-2">
                    <h1 className="text-lg text-left text-neutral-600">What would you like to do today?</h1>
                    <div className="grid grid-rows-1 grid-cols-2 gap-2 w-full h-full">
                        <button onClick={() => navigate("/book-flights")} className="bg-neutral-200 min-h-[400px] hover:scale-[101%] rounded-xl p-5 text-neutral-800 cursor-pointer hover:text-blue-400 duration-200 ease-linear shadow">
                            <div className="flex flex-col flex-grow relative h-full items-center justify-center space-y-3">
                                <h1 className="text-3xl font-semibold drop-shadow">Book a Flight</h1>
                                <p className="text-neutral-500">Here you can book new flights and confirm flight seat selection</p>
                            </div>
                        </button>

                        <div className="grid grid-cols-1 grid-rows-2 rounded-xl gap-2">
                             <button onClick={() => navigate("/manage-flights")} className="bg-neutral-200 hover:scale-[101%] rounded-xl p-5 text-neutral-800 cursor-pointer hover:text-blue-400 duration-200 ease-linear shadow">
                                <div className="flex flex-col flex-grow relative h-full items-center justify-center space-y-3">
                                    <h1 className="text-xl font-semibold drop-shadow">Manage your Flights</h1>
                                    <p className="text-sm text-neutral-500">Here you can manage your existing flights, i.e cancelling flights and modifying your seat selection.</p>
                                </div>
                             </button>

                             <button onClick={() => navigate("/flight-services")} className="bg-neutral-200 hover:scale-[101%] rounded-xl p-5 text-neutral-800 cursor-pointer hover:text-blue-400 duration-200 ease-linear shadow">
                                <div className="flex flex-col flex-grow relative h-full items-center justify-center space-y-3">
                                    <h1 className="text-xl font-semibold drop-shadow">Browse In-Flight Services</h1>
                                    <p className="text-sm text-neutral-500">Here you can browse our in-flight services such as our food and drink service.</p>
                                </div>
                             </button>
                        </div>
                    </div>
                </div>  
            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#4385f0" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default Home;