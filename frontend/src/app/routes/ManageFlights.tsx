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

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default ManageFlights;