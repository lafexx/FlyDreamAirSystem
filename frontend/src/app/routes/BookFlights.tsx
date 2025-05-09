import { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Flight } from "../../types/Flight";

import { BookingContextType } from "../../contexts/BookingContext";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FlightSettingsWidget from "../../components/FlightSettingsWidget";
import FlightListWidget from "../../components/FlightListWidget";

const BookFlights = () => { 


    // const [activeWindow, setActiveWindow] = useState<WindowType>(WindowType.FlightSettings);

    // const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", 0, "", []), []);
    // const [flight, setFlight] = useState<Flight>(emptyFlight);

    // const [isSearching, setIsSearching] = useState<boolean>(false);
    // const [selectedFlight, setSelectedFlight] = useState<Flight>(emptyFlight);
    
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!localStorage.getItem("currentUser")) {
    //         navigate("/login");
    //     }   
    // }, []);

    // useEffect(() => {
    //     if (isSearching) {
    //         setTimeout(() => {
    //             setIsSearching(false);
    //             setActiveWindow(WindowType.FlightList);
    //         }, 1000);
    //     }
    // }, [isSearching]);

    // useEffect(() => {
    //     if  (selectedFlight != emptyFlight) {
    //         localStorage.setItem(`${localStorage.getItem("currentUser")}:flight`, JSON.stringify(selectedFlight));
    //         navigate("/select-seats");
    //     }
    // }, [selectedFlight]);

    // const renderActiveWindow = () => {
    //     switch (activeWindow) {
    //         case WindowType.FlightSettings: {
    //             return <FlightSettingsWidget/>
    //         }
    //         case WindowType.FlightList: {
    //             return <FlightListWidget/>
    //         }
    //         default: {
    //             return <FlightSettingsWidget/>
    //         }
    //     }
    // }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>

            {/* <div className="flex-grow relative pb-4 flex items-center justify-center flex-col space-y-10">
                <div className='flex justify-center items-center w-full max-w-[450px]'>
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl text-center text-neutral-800 font-semibold">Book a Flight</h1>
                        <p className="text-neutral-500">Here you can book flights, input flight information, select a flight and then choose your seats!</p>
                        <button onClick={() => navigate("/")} className="text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Return to home page.</button>
                    </div>
                </div>

                <div className="flex justify-center items-center w-full">
                    <BookingContext.Provider value={{flight, setFlight, 
                                                    isSearching, setIsSearching,
                                                    selectedFlight, setSelectedFlight
                    }}>
                        {renderActiveWindow()}
                    </BookingContext.Provider>
                </div>
            </div> */}

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#4385f0" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default BookFlights;