import { Flight } from "../services/flight/types/Flight";

import { getRandomInt } from "../utils/MathUtils";

import { useBooking } from "../contexts/BookingContext";

import { IoAirplane } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FlightListWidget = () => {
    const { flight, setFlight } = useBooking();
    const navigate = useNavigate();
    
    const renderFlights = () => {
        if (!flight)
            return;
    
        const prices: number[] = [];
    
        for (let i = 0; i < 3; i++) {
            prices.push(getRandomInt(300, 500));
        }
    
        return prices.map((price, index) => (
            <button onClick={() => {
                setFlight((prev) => {
                    const newFlight: Flight = new Flight(prev);
                    newFlight.price = price;
                    return newFlight;
                })
 
                navigate("/select-seats");
            }} 
                    key={index} 
                    className={`rounded-xl cursor-pointer shadow border border-b bg-white border-neutral-300 mb-2 flex flex-col w-full text-left px-10 py-4 hover:border-b-neutral-600 duration-100 ease-linear`}>
                <div className="flex justify-between">
                    <h1 className="text-blue-500 text-xl font-semibold">{flight.departureLocation.city ?? ""}</h1>
                    <IoAirplane className="text-neutral-700 text-2xl"/>
                    <h1 className="text-blue-500 text-xl font-semibold">{flight.destination.city ?? ""}</h1>
                </div>

                <div className="flex justify-between text-neutral-500 text-sm">
                    <p>{flight.departureLocation.airport ?? ""}</p>
                    <p>{flight.destination.airport ?? ""}</p>
                </div>

                <div className="flex justify-between text-neutral-700 ">
                    <p>{flight.departureDate ?? ""}</p>
                    <p>{flight.arrivalDate ?? ""}</p>
                </div>
                
                <div className="py-4">
                    <div className="w-full px-4 h-[1px] bg-neutral-300"/>
                </div>
                
                <div className="flex justify-center text-neutral-700 space-x-1">
                    <p className="inline">From</p>
                    <p className="inline font-semibold text-blue-600">A${price}</p>
                </div>
            </button>
        ));
    }

    return (
        <div className="w-full max-w-[600px]  rounded-xl p-4 space-y-5 ">
            <div className="border-b pb-2 w-full">
                <h1 className="text-xl font-semibold text-neutral-800">Showing flights</h1>
                <div className="flex justify-between">
                    <p className="text-neutral-700">From: {flight.departureLocation.city ?? ""}&nbsp;&nbsp;To: {flight.destination.city ?? ""}&nbsp;&nbsp;On: {flight.departureDate ?? ""}</p>
                    <p className="text-neutral-700">(3 results)</p>
                </div>
            </div>
            <div>
                {flight && (
                    <>
                    {renderFlights()}
                    </>
                )}
            </div>
        </div>
    );
}

export default FlightListWidget;