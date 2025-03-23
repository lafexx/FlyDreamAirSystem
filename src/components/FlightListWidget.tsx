import { useContext } from "react";
import { BookingContext } from "../app/routes/BookFlights";
import { Flight } from "../types/Flight";

import { getRandomInt } from "../utils/MathUtils";

const renderFlights = (flight: Flight) => {
    const airlines = ["Delta", "Omega", "Alpha", "Beta"];
    return airlines.map((airline, index) => (
        <button key={index} 
                className={`${index % 2 === 0 ? "bg-neutral-300" : "bg-neutral-400"} p-2 flex flex-col w-full text-left hover:scale-[101%] hover:border-b duration-200 ease-linear rounded-xl`}>
            <div className="flex justify-between">
                <h1 className="text-neutral-800 font-semibold">{flight.departureLocation!.city} {">"} {flight.destination!.city}</h1>
                <h1 className="text-neutral-800 font-semibold">${getRandomInt(700, 1000)}</h1>
            </div>
            <div className="flex justify-between">
                <p className="text-sm text-neutral-600">{flight.departureDate}</p>
                <p className="text-sm text-neutral-600">{airline} Airline</p>
            </div>
        </button>
    ));
}

const FlightListWidget = () => {
    const bookingContext = useContext(BookingContext)!;
    const { flight } = bookingContext;

    return (
        <div className="w-full max-w-[600px]  rounded-xl p-4 space-y-5 ">
            <div className="border-b pb-2 w-full">
                <h1 className="text-xl font-semibold text-neutral-800">Showing flights</h1>
                <div className="flex justify-between">
                    <p className="text-neutral-700">From: {flight?.departureLocation!.city}&nbsp;&nbsp;To: {flight?.destination!.city}&nbsp;&nbsp;On: {flight?.departureDate!}</p>
                    <p className="text-neutral-700">(4 results)</p>
                </div>
            </div>
            <div>
                {flight && (
                    <>
                    {renderFlights(flight)}
                    </>
                )}
            </div>
        </div>
    );
}

export default FlightListWidget;