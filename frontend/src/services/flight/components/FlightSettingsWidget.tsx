import { useState, useEffect } from "react";

import { Value } from "../../../contexts/BookingContext";
import { Flight } from "../types/Flight";

import Calendar from 'react-calendar';
// @ts-expect-error no need to declare a module for *.css files due to scope
import '../../../../node_modules/react-calendar/dist/Calendar.css';

import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { useBooking } from "../../../contexts/BookingContext";

import { applyAddDays } from "../utils/DateUtils";

const FlightSettingsWidget = () => {
    const { setIsSearching, flight, setFlight } = useBooking();

    const [departureLocationDropdownEnabled, setDepartureLocationDropdownEnabled] = useState<boolean>(false);
    const [destinationDropdownEnabled, setDestinationDropdownEnabled] = useState<boolean>(false);
    const [departureDateDropdownEnabled, setDepartureDateDropdownEnabled] = useState<boolean>(false);

    const locations = [
        {
            country: "Australia",
            city: "Sydney",
            airport: "Sydney Kingsford Smith Airport"
        },
        {
            country: "United States",
            city: "New York",
            airport: "John F. Kennedy International Airport"
        },
        {
            country: "United Kingdom",
            city: "London",
            airport: "Heathrow Airport"
        },
        {
            country: "France",
            city: "Paris",
            airport: "Charles de Gaulle Airport"
        },
        {
            country: "Japan",
            city: "Tokyo",
            airport: "Haneda Airport"
        },
        {
            country: "United Arab Emirates",
            city: "Dubai",
            airport: "Dubai International Airport"
        },
        {
            country: "Germany",
            city: "Frankfurt",
            airport: "Frankfurt Airport"
        },
        {
            country: "Canada",
            city: "Toronto",
            airport: "Toronto Pearson International Airport"
        },
        {
            country: "Brazil",
            city: "São Paulo",
            airport: "São Paulo/Guarulhos International Airport"
        },
        {
            country: "South Africa",
            city: "Johannesburg",
            airport: "O. R. Tambo International Airport"
        },
        {
            country: "China",
            city: "Beijing",
            airport: "Beijing Capital International Airport"
        }
    ];

    const [calendarValue, calendarOnChange] = useState<Value>();

    useEffect(() => {
        if (!flight.departureDate) {
            setFlight((prev) => {
                const newFlight: Flight = new Flight(prev);
                const departureDate: string | undefined = calendarValue?.toLocaleString()!.split(",")[0];
                const arrivalDate: string | undefined = applyAddDays(calendarValue!, 1)?.toLocaleString()!.split(",")[0];
                
                if (departureDate && arrivalDate) {
                    newFlight.departureDate = departureDate
                    newFlight.arrivalDate = arrivalDate;
                }

                return newFlight;
            })
        }

        if (departureDateDropdownEnabled) {
            setDepartureDateDropdownEnabled((prev) => !prev);
        }
    }, [calendarValue]);

    const renderDepartureLocations = () => {
        return locations.map((location, index) => (
            <button onClick={() => {
                setFlight((prev) => {
                    const newFlight: Flight = new Flight(prev);
                    const departureLocation: {country: string, city: string, airport: string} = {
                        country: location.country,
                        city: location.city,
                        airport: location.airport
                    };
                    newFlight.departureLocation = departureLocation;
                    return newFlight;
                })

                setDepartureLocationDropdownEnabled((prev) => !prev);
            }} key={index} 
                    className={`cursor-pointer rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
                <h1 className="text-neutral-800 font-semibold">{location.city}, {location.country}</h1>
                <p className="text-sm text-neutral-600">{location.airport}</p>
            </button>
        ))
    }

    const renderDestinationLocations = () => {
        return locations.map((location, index) => (
            <button onClick={() => {
                setFlight((prev) => {
                    const newFlight: Flight = new Flight(prev);
                    const destination: {country: string, city: string, airport: string} = {
                        country: location.country,
                        city: location.city,
                        airport: location.airport, 
                    };
                    
                    newFlight.destination = destination;

                    return newFlight;
                });

                setDestinationDropdownEnabled((prev) => !prev)
            }} key={index} 
                    className={`cursor-pointer rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
                <h1 className="text-neutral-800 font-semibold">{location.city}, {location.country}</h1>
                <p className="text-sm text-neutral-600">{location.airport}</p>
            </button>
        ))
    };

    const searchFlights = () => {
        if (flight.departureLocation && flight.destination && flight.departureDate) {
            if (flight.departureLocation.airport !== flight.destination.airport) {
                setIsSearching(true);
            }
        }
    };

    const renderWidget = () => {
        return (
            <div className="w-full">
                <div className="flex justify-between space-x-4">
                    <div className="w-full h-full">
                        <h1>From</h1>
                        <button onClick={() => {
                            setDestinationDropdownEnabled(false);
                            setDepartureDateDropdownEnabled(false);
                            setDepartureLocationDropdownEnabled((prev) => !prev);
                        }} className="flex justify-between h-[70px] w-full border cursor-pointer shadow border-neutral-500  p-4 space-x-4 items-center">
                            <div className="space-x-4">
                                <PiAirplaneTakeoffFill className="inline text-neutral-700 text-2xl"/>
                                <h1 className="inline text-xs text-neutral-600">{flight.departureLocation.country  ? `${flight.departureLocation.airport}, ${flight.departureLocation.city}, ${flight.departureLocation.country}` : `Select departure location...`}</h1>
                            </div>
                        </button>
                    </div>

                    <div className="w-full h-full">
                        <h1>To</h1>
                        <button onClick={() => {
                            setDestinationDropdownEnabled((prev) => !prev);
                            setDepartureDateDropdownEnabled(false);
                            setDepartureLocationDropdownEnabled(false);
                        }} className="flex justify-between w-full border cursor-pointer shadow border-neutral-500 h-[70px] p-4 space-x-4 items-center">
                            <div className="space-x-4">
                                <PiAirplaneLandingFill className="inline text-neutral-700 text-2xl"/>
                                <h1 className="inline text-xs text-neutral-600">{flight.destination.country ? `${flight.destination.airport}, ${flight.destination.city}, ${flight.destination.country}` : `Select destination...`}</h1>
                            </div>
                        </button>
                    </div>
                    
                    <div className="w-full h-full">
                        <h1>When</h1>
                        <button onClick={() => {
                            setDestinationDropdownEnabled(false);
                            setDepartureDateDropdownEnabled((prev) => !prev);
                            setDepartureLocationDropdownEnabled(false);
                        }} className="flex justify-between w-full border cursor-pointer shadow border-neutral-500 h-[70px] p-4 space-x-4 items-center">
                            <div className="space-x-4">
                                <MdOutlineDateRange className="inline text-neutral-700 text-2xl"/>
                                <h1 className="inline text-sm text-neutral-600">{flight.departureDate ? flight.departureDate : `Select departure date...`}</h1>
                            </div>
                        </button>
                    </div>

                     {departureLocationDropdownEnabled && (
                        <div className="absolute z-10 top-40 blur-none w-full max-w-[500px] max-h-[250px] overflow-y-auto bg-white border shadow border-neutral-500 space-y-4  p-4 items-center">
                            <div className="flex justify-between">
                                <h1 className="text-2xl text-neutral-700">Select departure location</h1>
                                <button onClick={() => setDepartureDateDropdownEnabled(false)} className="text-neutral-600 hover:text-neutral-900 cursor-pointer">
                                    <IoMdClose className="text-2xl"/>
                                </button>
                            </div>
                            {renderDepartureLocations()}
                        </div>
                    )} 

                    {destinationDropdownEnabled && (
                        <div className="absolute z-10 left-76 top-40 blur-none w-full max-w-[500px] max-h-[250px] overflow-y-auto bg-white border shadow border-neutral-500 space-y-4  p-4 items-center">
                            <div className="flex justify-between">
                                <h1 className="text-2xl text-neutral-700">Select destination</h1>
                                <button onClick={() => setDepartureDateDropdownEnabled(false)} className="text-neutral-600 hover:text-neutral-900 cursor-pointer">
                                    <IoMdClose className="text-2xl"/>
                                </button>
                            </div>
                            {renderDestinationLocations()}
                        </div>
                    )}

                    {departureDateDropdownEnabled && (
                        <div className="absolute z-10 left-149 top-40 blur-none w-full max-w-[500px] max-h-[250px] overflow-y-auto bg-white border shadow border-neutral-500 space-y-4  items-center">
                            <Calendar minDate={new Date()} onChange={calendarOnChange} value={calendarValue}/>
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-7">
                    <button
                        disabled={flight.departureLocation.country == "" || flight.destination.country == "" || flight.departureDate == null}
                        onClick={() => searchFlights()} className="bg-blue-600 disabled:opacity-50 p-3 rounded-2xl shadow drop-shadow text-white px-15 not-disabled:hover:bg-blue-500 duration-100 ease-linear not-disabled:cursor-pointer">
                        Search Flights
                    </button>
                </div>
            </div>
        );
    }

    return renderWidget();
}

export default FlightSettingsWidget;