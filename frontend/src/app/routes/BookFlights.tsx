import { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Flight } from "../../types/Flight";

import { BookingContextType } from "../../contexts/BookingContext";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FlightSettingsWidget from "../../components/FlightSettingsWidget";
import FlightListWidget from "../../components/FlightListWidget";

export const BookingContext = createContext<BookingContextType | null>(null);

const BookFlights = () => { 
    enum WindowType {
        FlightSettings = 0,
        FlightList = 1,
    }

    const [activeWindow, setActiveWindow] = useState<WindowType>(WindowType.FlightSettings);
    const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", 0, "", []), []);
    const [flight, setFlight] = useState<Flight>(emptyFlight);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight>(emptyFlight);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);

    useEffect(() => {
        if (isSearching) {
            setTimeout(() => {
                setIsSearching(false);
                setActiveWindow(WindowType.FlightList);
            }, 1000);
        }
    }, [isSearching]);

    useEffect(() => {
        localStorage.setItem(`${localStorage.getItem("currentUser")}:flight`, JSON.stringify(selectedFlight));
        navigate("/select-seats");
    }, [selectedFlight]);

    const renderActiveWindow = () => {
        switch (activeWindow) {
            case WindowType.FlightSettings: {
                return <FlightSettingsWidget/>
            }
            case WindowType.FlightList: {
                return <FlightListWidget/>
            }
            default: {
                return <FlightSettingsWidget/>
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-10">
                <div className="text-center space-y-2 px-10">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">Book a Flight</h1>
                    <p className="text-neutral-500">Here you can book flights, input flight information, select a flight and then choose your seats!</p>
                    <div className="flex justify-center">
                        <button onClick={() => navigate("/")} className="text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Return to home page.</button>
                    </div>
                </div>

               <BookingContext.Provider value={{flight, setFlight, 
                                                isSearching, setIsSearching,
                                                selectedFlight, setSelectedFlight
                }}>
                    {renderActiveWindow()}
               </BookingContext.Provider>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default BookFlights;