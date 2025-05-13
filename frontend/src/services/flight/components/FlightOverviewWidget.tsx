import { useEffect, useState, useMemo } from "react";
import { Flight } from "../types/Flight";

import { foodAddons, drinkAddons } from "../../../app/routes/SelectAddons";
import { renderSeats } from "../../../app/routes/SelectSeats";

import { IoAirplane } from "react-icons/io5";
import { GetFlightById, GetFlightByUsernameAndId } from "../api/FlightInterface";

import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface FlightOverviewProps {
    flightId?: string | undefined;
    _flight?: Flight | null;
    checkoutCallback?: () => void;
    cancellationCallback?: () => void;
}

const FlightOverviewWidget: React.FC<FlightOverviewProps> = ({
    flightId = undefined,
    _flight = null,
    checkoutCallback = () => {},
    cancellationCallback = () => {},
}) => {
    const emptyFlight: Flight = useMemo(() => new Flight(), []);
    const [displayedFlight, setDisplayedFlight] = useState<Flight>(emptyFlight);

    const auth = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!flightId && _flight) {
            setDisplayedFlight(_flight);
        }
        else if (flightId && !_flight) {
            const getFlightInformation = async () => {
                let flight: Flight | null = null;

                if (auth.username != "") {
                    flight = await GetFlightByUsernameAndId(auth.username, flightId);
                } else {
                    flight = await GetFlightById(flightId);
                }
                
                if (!flight) {
                    navigate("/");
                    return;
                }

                setDisplayedFlight(flight);
            };

            getFlightInformation();
        }
    }, [_flight, flightId]);

    return (
        <div>
            <div className="text-center space-y-2 px-10">
                <h1 className="text-4xl text-center text-neutral-600 font-semibold">Flight Overview</h1>
                <p className="text-neutral-500">Showing current flight information</p>
            </div>

            <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2 w-full max-w-[900px] scale-[85%]">
                <div className="row-start-1 col-start-1 col-span-2">
                    <div className={`rounded-xl shadow border border-b bg-white border-neutral-300 mb-2 flex flex-col w-full text-left px-10 py-4`}>
                        <div className="flex justify-between">
                            <h1 className="text-blue-500 text-xl font-semibold">{displayedFlight.departureLocation!.city}</h1>
                            <IoAirplane className="text-neutral-700 text-2xl"/>
                            <h1 className="text-blue-500 text-xl font-semibold">{displayedFlight.destination!.city}</h1>
                        </div>

                        <div className="flex justify-between text-neutral-500 text-sm">
                            <p>{displayedFlight.departureLocation.airport}</p>
                            <p>{displayedFlight.destination.airport}</p>
                        </div>

                        <div className="flex justify-between text-neutral-700 ">
                            <p>{displayedFlight.departureDate}</p>
                            <p>{displayedFlight.arrivalDate}</p>
                        </div>
                    </div>
                </div>

                <div className="row-start-2 col-start-1 col-span-1">
                    <div className="bg-white shadow drop-shadow rounded-xl min-w-[400px] w-full min-h-[430px] p-4 h-full">
                        <h1 className="text-neutral-600 text-2xl font-semibold">Selected Seats</h1>
                        <div className="pt-4 w-full h-full flex justify-center">
                            {(() => {
                            if (displayedFlight && displayedFlight.seats) {
                                return renderSeats(displayedFlight.seats ?? [], undefined);
                            }
                        })()}
                        </div>
                    </div>
                </div>

                <div className="row-start-2 col-start-2 col-span-1 bg-white shadow drop-shadow rounded-xl p-4 space-y-2">
                    <h1 className="text-neutral-700 text-2xl font-semibold">Your addons</h1>
                    <div className="w-full  overflow-auto flex h-[275px]">
                        {displayedFlight.addons.size > 0 ? (
                            <ul className="w-full overflow-auto">
                                {[...displayedFlight.addons.entries()].map(([key, value]) => (
                                    <li className="text-neutral-700 w-full flex justify-between" key={key}>
                                        <div>
                                            <p className="inline">- {key} </p>
                                            <p className="inline text-neutral-800">x{value}</p>
                                        </div>

                                        <div>
                                            <p>
                                                A${({...foodAddons, ...drinkAddons}[key].price * value).toFixed(2)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="w-full flex justify-center">
                                <p className="text-neutral-500 pt-4">No flight addons.</p>
                            </div>
                        )}
                    </div>

                    {(!flightId && _flight) && (
                        <button onClick={() => checkoutCallback()} className="bg-blue-500 w-full rounded-lg py-2.5 px-10 hover:bg-blue-400 duration-200 ease-linear shadow">
                            <p className="text-white">Proceed to Checkout</p>
                            <p className="text-white font-bold">A${displayedFlight.price}</p>
                        </button>
                    )}

                    {(flightId && !_flight) && (
                        <button onClick={() => cancellationCallback()} className="bg-red-500 cursor-pointer w-full rounded-lg py-2 px-10 hover:bg-red-400 duration-100 ease-linear shadow">
                            <p className="text-white">Cancel Flight</p>
                            <p className="text-white font-bold">A$200 Fee</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FlightOverviewWidget;