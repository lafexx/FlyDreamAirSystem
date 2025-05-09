import { useContext } from "react";
import { BookingContext } from "../app/routes/BookFlights";
import { Flight } from "../types/Flight";

import { getRandomInt } from "../utils/MathUtils";

const renderFlights = () => {
    const bookingContext = useContext(BookingContext)!;
    const { flight, setSelectedFlight } = bookingContext;

    if (!flight)
        return;

    const airlines = ["Delta", "Omega", "Alpha", "Beta"];
    let prices: number[] = [];

    for (let i = 0; i < airlines.length; i++) {
        prices.push(getRandomInt(700, 1000));
    }

    return airlines.map((airline, index) => (
        <button onClick={() => setSelectedFlight(new Flight("", "", flight.departureLocation, flight.destination, flight.departureDate, prices[index], airline, []))} 
                key={index} 
                className={`rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
            <div className="flex justify-between">
                <h1 className="text-neutral-800 font-semibold">{flight?.departureLocation!.city} {">"} {flight?.destination!.city}</h1>
                <h1 className="text-neutral-800 font-semibold">${prices[index]}</h1>
            </div>
            <div className="flex justify-between">
                <p className="text-sm text-neutral-600">{flight?.departureDate}</p>
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
                    {renderFlights()}
                    </>
                )}
            </div>
        </div>
    );
}

export default FlightListWidget;