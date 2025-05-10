import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FlightSettingsWidget from "../../../components/FlightSettingsWidget";
import LoadingCircleSpinner from "../../../components/animations/LoadingCircleSpinner";

import { FaSuitcase } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { useBooking } from "../../../contexts/BookingContext";

const PrimaryWidget = () => {
    enum Sections {
        BookFlight = 0,
        ManageFlights = 1
    }

    const {isSearching} = useBooking();
    const [activeSection, setActiveSection] = useState<Sections>(Sections.BookFlight);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSearching) {
            setTimeout(() => {
                navigate("/flight-list");
            }, 2000);
        }
    }, [isSearching]);

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

            <div className="w-full h-[250px] bg-neutral-200">
                {activeSection === Sections.BookFlight ? (
                    <div>
                        {!isSearching ? (
                            <FlightSettingsWidget/>
                        ) : (
                            <div className="h-full flex flex-col relative items-center justify-center space-y-4">
                                <h1 className="text-neutral-600">Searching for flights...</h1>
                                <LoadingCircleSpinner/>
                            </div>
                        )}
                    </div>
                ) : (
                    <h1>hi</h1>
                )}
            </div>
        </div>
    );
};

export default PrimaryWidget;