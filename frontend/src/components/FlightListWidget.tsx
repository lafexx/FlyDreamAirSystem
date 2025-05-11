import { Flight } from "../services/flight/types/Flight";
import { Value } from "../contexts/BookingContext";

import { getRandomInt } from "../utils/MathUtils";
import { applyAddDays } from "../services/flight/utils/DateUtils";

import { useBooking } from "../contexts/BookingContext";

import { IoAirplane } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FlightListWidget = () => {
    const { flight, setSelectedFlight, calendarValue, departureLocation, setPrice, destination } = useBooking();
    const navigate = useNavigate();
    
    const renderFlights = () => {
        if (!flight)
            return;
    
        let prices: number[] = [];
    
        for (let i = 0; i < 3; i++) {
            prices.push(getRandomInt(300, 500));
        }
    
        return prices.map((price, index) => (
            <button onClick={() => {
                setPrice(price);
                setSelectedFlight(new Flight("", "", departureLocation, destination, calendarValue?.toLocaleString()!.split(",")[0]!, applyAddDays(calendarValue!, 1)?.toLocaleString()!.split(",")[0]!, price, []))
                navigate("/select-seats");
            }} 
                    key={index} 
                    className={`rounded-xl cursor-pointer shadow border border-b bg-white border-neutral-300 mb-2 flex flex-col w-full text-left px-10 py-4 hover:border-b-neutral-600 duration-100 ease-linear`}>
                <div className="flex justify-between">
                    <h1 className="text-blue-500 text-xl font-semibold">{departureLocation!.city}</h1>
                    <IoAirplane className="text-neutral-700 text-2xl"/>
                    <h1 className="text-blue-500 text-xl font-semibold">{destination!.city}</h1>
                </div>

                <div className="flex justify-between text-neutral-500 text-sm">
                    <p>{departureLocation.airport}</p>
                    <p>{destination.airport}</p>
                </div>

                <div className="flex justify-between text-neutral-700 ">
                    <p>{calendarValue?.toLocaleString()!.split(",")[0]}</p>
                    <p>{applyAddDays(calendarValue!, 1)?.toLocaleString()!.split(",")[0]}</p>
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
                    <p className="text-neutral-700">From: {departureLocation!.city}&nbsp;&nbsp;To: {destination!.city}&nbsp;&nbsp;On: {calendarValue?.toLocaleString()!.split(",")[0]}</p>
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