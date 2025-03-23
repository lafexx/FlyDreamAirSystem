import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { Flight } from "../../types/Flight";

import { FlightContextType } from "../../contexts/FlightContext";

import Navbar from "../../components/Navbar";
import FlightSettingsWidget from "../../components/FlightSettingsWidget";

export const FlightContext = createContext<FlightContextType | null>(null);

const BookFlights = () => {
    const [flight, setFlight] = useState<Flight | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-10">
                <div className="text-center space-y-2 px-10">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">Book a Flight</h1>
                    <p className="text-neutral-500">Here you can book flights, input flight information, select a flight and then choose your seats!</p>
                </div>

               <FlightContext.Provider value={{flight, setFlight}}>
                <FlightSettingsWidget/>
               </FlightContext.Provider>
            </div>
        </div>
    );
}

export default BookFlights;