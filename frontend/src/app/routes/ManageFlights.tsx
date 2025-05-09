import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import BookedFlightList from "../../services/flight/components/BookedFlightList";

const ManageFlights = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-15">
                <div className="font-semibold text-center space-y-2">
                    <h1 className="text-4xl text-center text-neutral-600">Your Flights</h1>
                    <p className="text-neutral-500 font-normal">Select a flight to manage.</p>
                    <div className="flex justify-center">
                        <button onClick={() => navigate("/")} className="text-neutral-500 font-normal hover:text-blue-400 underline duration-200 ease-linear">Return to home page.</button>
                    </div>
                </div>

                <BookedFlightList/>
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

export default ManageFlights;