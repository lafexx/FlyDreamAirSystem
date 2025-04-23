import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useParams } from "react-router-dom";
import { Flight } from "../../types/Flight";

import { renderSeats } from "./SelectSeats";

import { GetFlightByUsernameAndId, CancelFlight } from "../../services/flight/api/FlightInterface";

const ManageFlight = () => {
    const navigate = useNavigate();
    const { flightId } = useParams();
    const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", 0, "", []), []);
    const [flight, setFlight] = useState<Flight>(emptyFlight);

    useEffect(() => {
        const currentUser: string | null = localStorage.getItem("currentUser");

        if (!currentUser) {
            navigate("/login");
            return;
        }

        if (!flightId) {
            navigate("/");
            return;
        }
        
        const getFlightByUsernameAndId = async () => {

            const _flight: Flight | null = await GetFlightByUsernameAndId(currentUser, flightId);
            if (!_flight) {
                console.warn("Failed to get flight by username and flightId.");
                return;
            }
            setFlight(_flight);
        };

        getFlightByUsernameAndId();
    }, []);

    const cancelFlight = async () => {
        const currentUser: string | null = localStorage.getItem("currentUser");
        if (!currentUser)
            return;

        if (!flightId)
            return;

        const flightCancelled: boolean = await CancelFlight(currentUser, flightId);
        if (!flightCancelled)
            return;

        navigate("/manage-flights");
    };
     
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-15">
                <div className="font-semibold text-center space-y-2">
                    <h1 className="text-4xl text-center text-neutral-600">Manage flight</h1>
                    <div className="flex justify-center">
                        <button onClick={() => navigate("/manage-flights")} className="font-normal text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Return to flight list</button>
                    </div>
                </div>

                <div className="grid grid-rows-[auto_auto] grid-cols-1 w-full max-w-[700px] gap-2">
                    <div className="grid grid-rows-1 grid-cols-[auto_auto] gap-2 w-full">
                        <button className="bg-neutral-300 hover:bg-neutral-600 hover:text-neutral-100 rounded-lg py-4 hover:mb-1 duration-100 ease-linear">
                            Change Seats
                        </button>
                        <button onClick={() => cancelFlight()} className="bg-neutral-300 hover:bg-red-400 hover:text-neutral-100 rounded-lg py-4 hover:mb-1 duration-100 ease-linear">
                            Cancel Flight
                        </button>
                    </div>

                    <div className="grid grid-rows-1 grid-cols-[auto_auto] gap-2">
                        <div className="bg-neutral-300 p-4 h-full rounded-xl">
                            <div className="flex flex-col min-w-[150px] flex-grow h-[85%] relative">
                                <h1 className="text-2xl text-neutral-700 font-semibold">Summary</h1>
                                <div className="space-x-2 text-neutral-600">
                                    <p className="inline">{flight.departureLocation.city}</p>
                                    <p className="inline">{">"}</p>
                                    <p className="inline">{flight.destination.city}</p>
                                </div>
                                <p className="text-neutral-600">{flight.departureDate}</p>
                                <p className="text-neutral-600">{flight.airline} Airline</p>   
                            </div>

                            <div>
                                <h1 className="text-neutral-700 font-semibold text-2xl">Total: ${flight.price}</h1>
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
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default ManageFlight;