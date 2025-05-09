import { FaSuitcase } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";

import { useState, useMemo , createContext } from "react";
import FlightSettingsWidget from "../../../components/FlightSettingsWidget";

import { Flight } from "../../../types/Flight";
import { BookingContextType } from "../../../contexts/BookingContext";

export const BookingContext = createContext<BookingContextType | null>(null);

const PrimaryWidget = () => {
    enum Sections {
        BookFlight = 0,
        ManageFlights = 1
    }

    const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", 0, "", []), []);
    const [flight, setFlight] = useState<Flight>(emptyFlight);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight>(emptyFlight);

    const [activeSection, setActiveSection] = useState<Sections>(Sections.BookFlight);

    return (
        <div className="w-full h-full bg-white shadow drop-shadow">
            <div className="flex justify-between">
                    <button onClick={() => setActiveSection(Sections.BookFlight)} className={`flex space-x-2 w-full max-w-[50%] ${activeSection === Sections.BookFlight ? "border-t-5 border-t-blue-500" : ""} border-r-2 border-neutral-400 p-4 cursor-pointer`}>
                        <FaSuitcase className="text-2xl text-neutral-700"/>
                        <h1>Book a flight</h1>
                    </button>

                    <button onClick={() => setActiveSection(Sections.ManageFlights)} className={`flex space-x-2 w-full max-w-[50%] ${activeSection === Sections.ManageFlights ? "border-t-5 border-t-blue-500" : ""} p-4 cursor-pointer`}>
                        <FaTicketAlt className="text-2xl text-neutral-700"/>
                        <h1>Manage your flights</h1>
                    </button>
            </div>

            <div className="w-full h-full max-h-[200px] bg-neutral-200">
                {activeSection === Sections.BookFlight ? (
                    <BookingContext.Provider value={{flight, setFlight, 
                                                    isSearching, setIsSearching,
                                                    selectedFlight, setSelectedFlight
                                        }}>
                        <FlightSettingsWidget/>
                    </BookingContext.Provider>
                ) : (
                    <h1>hi</h1>
                )}
            </div>
        </div>
    );
};

export default PrimaryWidget;