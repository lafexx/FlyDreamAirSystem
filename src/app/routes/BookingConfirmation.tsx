import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Flight } from "../../types/Flight";

import { getStoredData } from "../../utils/ObjUtils";

import { aisleMap } from "./SelectSeats";
import { renderSeats } from "./SelectSeats";

const BookingConfirmation = () => {
    const navigate = useNavigate();
    const [flight, setFlight] = useState<Flight>();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }  

        const storedFlight = getStoredData<Flight>(`${localStorage.getItem("currentUser")}:flight`);
        if (storedFlight) {
            setFlight(storedFlight);
        }
    }, []);

    const render = () => {
        if (!flight) 
            <div>null flight</div>

        return (
            <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
                <Navbar/>
            
                <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-5 px-10">
                    <div className="font-semibold text-center space-y-2">
                        <h1 className="text-4xl text-center text-neutral-600">Flight Booked!</h1>
                        <p className="text-neutral-500 font-normal">Your flight has been succesfully booked. You can view your flight details below and manage your flight from the home page.</p>
                        <div className="flex justify-center">
                            <button onClick={() => navigate("/flight-services")} className="text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Browse in-flight services</button>
                        </div>
                    </div>

                    <div className="grid grid-rows-1 grid-cols-[auto_auto] w-full max-w-[700px] gap-2">
                        <div className="bg-neutral-300 p-4 h-full rounded-xl">
                            <div className="flex flex-col min-w-[150px] flex-grow h-[85%] relative">
                                <h1 className="text-2xl text-neutral-700 font-semibold">Summary</h1>
                                <div className="space-x-2 text-neutral-600">
                                    <p className="inline">{flight?.departureLocation?.city}</p>
                                    <p className="inline">{">"}</p>
                                    <p className="inline">{flight?.destination?.city}</p>
                                </div>
                                <p className="text-neutral-600">{flight?.departureDate}</p>
                                <p className="text-neutral-600">{flight?.airline} Airline</p>   
                            </div>

                            <div>
                                <h1 className="text-neutral-700 font-semibold text-2xl">Total: ${flight?.price}</h1>
                            </div>
                        </div>

                        <div className="bg-neutral-300 rounded-xl p-4 min-w-[300px] w-full min-h-[400px] h-full flex justify-center">
                            {(() => {
                                if (flight) {
                                    if (flight.seats) {
                                        return renderSeats(flight?.seats!, undefined);
                                    }
                                }
                            })()}
                         </div>
                    </div>
                </div>

                <div className="pb-4">
                    <Footer/>
                </div>
            </div>
        );
    }

    return render();
}

export default BookingConfirmation;