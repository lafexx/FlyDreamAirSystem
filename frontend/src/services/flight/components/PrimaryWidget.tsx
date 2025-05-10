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

    const {isSearching, setIsSearching} = useBooking();
    const [activeSection, setActiveSection] = useState<Sections>(Sections.BookFlight);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSearching) {
            setTimeout(() => {
                setIsSearching(false);
                navigate("/flight-list");
            }, 600);
        }
    }, [isSearching]);

    return (
        <div className="w-full h-full bg-white shadow drop-shadow">
            <div className="flex justify-between">
                    <button onClick={() => setActiveSection(Sections.BookFlight)} className={`flex space-x-2 w-full max-w-[50%] ${activeSection === Sections.BookFlight ? "border-t-5 border-t-blue-500" : ""} border-r-2 border-b-1 border-neutral-400 p-4 cursor-pointer`}>
                        <FaSuitcase className="text-2xl text-neutral-700"/>
                        <h1>Book a flight</h1>
                    </button>

                    <button onClick={() => setActiveSection(Sections.ManageFlights)} className={`flex space-x-2 w-full max-w-[50%] ${activeSection === Sections.ManageFlights ? "border-t-5 border-t-blue-500" : ""} border-b-1 border-neutral-400 p-4 cursor-pointer`}>
                        <FaTicketAlt className="text-2xl text-neutral-700"/>
                        <h1>Manage your flights</h1>
                    </button>
            </div>

            <div className="w-full h-[250px] bg-white">
                <div className="h-full flex flex-col relative items-center justify-center">
                    {activeSection === Sections.BookFlight ? (
                        <div className="px-2 w-full">
                            {!isSearching ? (
                                <FlightSettingsWidget/>
                            ) : (
                                <div className="space-y-4">
                                    <h1 className="text-center text-neutral-600">Searching for flights...</h1>
                                    <LoadingCircleSpinner/>
                                </div>
                            )}
                        </div>
                    ) : (
                        <h1>hi</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrimaryWidget;