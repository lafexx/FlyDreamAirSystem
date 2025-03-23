import { useState, useContext, useEffect } from "react";

import { FlightContext } from "../app/routes/BookFlights";

import Calendar from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';

import LoadingCircleSpinner from "./animations/LoadingCircleSpinner";

import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FlightSettingsWidget = () => {
    const flightContext = useContext(FlightContext);
    const { setFlight } = flightContext!; 

    const [departureLocation, setDepartureLocation] = useState<{
        country: string,
        city: string,
        airport: string
    } | null>(null);

    const [destination, setDestination] = useState<{
        country: string,
        city: string,
        airport: string
    } | null>(null);

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [departureDate, setDepartureDate] = useState<string | null>(null);
    const [calendarValue, calenderOnChange] = useState<Value>();

    const [departureLocationDropdownEnabled, setDepartureLocationDropdownEnabled] = useState<boolean>(false);
    const [destinationDropdownEnabled, setDestinationDropdownEnabled] = useState<boolean>(false);
    const [departureDateDropdownEnabled, setDepartureDateDropdownEnabled] = useState<boolean>(false);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    useEffect(() => {
        if (calendarValue) {
            setDepartureDate(calendarValue?.toLocaleString()!.split(",")[0]);
        }

        if (departureDateDropdownEnabled) {
            setDepartureDateDropdownEnabled((prev) => !prev);
        }

        setFlight!({
            departureLocation: departureLocation,
            destination: destination,
            departureDate: calendarValue?.toLocaleString()!.split(",")[0]!
        });
    }, [departureLocation, destination, calendarValue])

    const renderDepartureLocations = () => {
        return locations.map((location, index) => (
            <button onClick={() => {
                setDepartureLocation({
                    country: location.country,
                    city: location.city,
                    airport: location.airport
                });
                setDepartureLocationDropdownEnabled((prev) => !prev);
            }} key={index} 
                    className={`${index % 2 === 0 ? "bg-neutral-300" : "bg-neutral-400"} p-2 flex flex-col w-full text-left hover:scale-[101%] hover:border-b duration-200 ease-linear`}>
                <h1 className="text-neutral-800 font-semibold">{location.city}, {location.country}</h1>
                <p className="text-sm text-neutral-600">{location.airport}</p>
            </button>
        ))
    }

    const renderDestinationLocations = () => {
        return locations.map((location, index) => (
            <button onClick={() => {
                setDestination({
                    country: location.country,
                    city: location.city,
                    airport: location.airport
                });
                setDestinationDropdownEnabled((prev) => !prev)
            }} key={index} 
                    className={`${index % 2 === 0 ? "bg-neutral-300" : "bg-neutral-400"} p-2 flex flex-col w-full text-left hover:scale-[101%] hover:border-b duration-200 ease-linear`}>
                <h1 className="text-neutral-800 font-semibold">{location.city}, {location.country}</h1>
                <p className="text-sm text-neutral-600">{location.airport}</p>
            </button>
        ))
    };

    const searchFlights = () => {
        setIsDisabled(true);
        setIsLoading(true);
    };

    const renderWidget = () => {
        if (isLoading)
            return (
                <div className="text-center space-y-5">
                    <h1 className="text-neutral-600 text-xl">Searching flights...</h1>
                    <LoadingCircleSpinner/>
                </div>
            );

        return (
            <div className="w-full flex flex-col gap-2 items-center justify-center px-10 duration-200 ease-linear">
                <button disabled={isDisabled} onClick={() => {
                    setDestinationDropdownEnabled(false);
                    setDepartureDateDropdownEnabled(false);
                    setDepartureLocationDropdownEnabled((prev) => !prev);
                }} className="flex justify-between w-full max-w-[500px] border hover:scale-[101%] shadow border-neutral-500 rounded-xl p-4 items-center">
                    <div className="space-x-4">
                        <PiAirplaneTakeoffFill className="inline text-neutral-700 text-4xl"/>
                        <h1 className="inline text-sm text-neutral-600">{departureLocation !== null ? `${departureLocation.airport}, ${departureLocation.city}, ${departureLocation.country}` : `Select departure location...`}</h1>
                    </div>
                    {(() => {
                        if (departureLocationDropdownEnabled)
                            return <FaChevronUp className="text-neutral-700 text-3xl"/>
                        else
                            return <FaChevronDown className="text-neutral-700 text-3xl"/>
                    })()}
                </button>

                {departureLocationDropdownEnabled && (
                    <div className="w-full max-w-[500px] max-h-[200px] overflow-y-auto  border shadow border-neutral-500 rounded-xl p-4 items-center">
                        {renderDepartureLocations()}
                    </div>
                )}

                <button disabled={isDisabled} onClick={() => {
                    setDestinationDropdownEnabled((prev) => !prev);
                    setDepartureDateDropdownEnabled(false);
                    setDepartureLocationDropdownEnabled(false);
                }} className="flex justify-between w-full max-w-[500px] border hover:scale-[101%] shadow border-neutral-500 rounded-xl p-4 items-center">
                    <div className="space-x-4">
                        <PiAirplaneLandingFill className="inline text-neutral-700 text-4xl"/>
                        <h1 className="inline text-sm text-neutral-600">{destination !== null ? `${destination.airport}, ${destination.city}, ${destination.country}` : `Select destination...`}</h1>
                    </div>
                    {(() => {
                        if (destinationDropdownEnabled)
                            return <FaChevronUp className="text-neutral-700 text-3xl"/>
                        else
                            return <FaChevronDown className="text-neutral-700 text-3xl"/>
                    })()}
                </button>

                {destinationDropdownEnabled && (
                    <div className="w-full max-w-[500px] max-h-[200px] overflow-y-auto  border shadow border-neutral-500 rounded-xl p-4 items-center">
                        {renderDestinationLocations()}
                    </div>
                )}

                <button disabled={isDisabled} onClick={() => {
                    setDestinationDropdownEnabled(false);
                    setDepartureDateDropdownEnabled((prev) => !prev);
                    setDepartureLocationDropdownEnabled(false);
                }} className="flex justify-between w-full max-w-[500px] border hover:scale-[101%] shadow border-neutral-500 rounded-xl p-4 items-center">
                    <div className="space-x-4">
                        <MdOutlineDateRange className="inline text-neutral-700 text-4xl"/>
                        <h1 className="inline text-sm text-neutral-600">{departureDate !== null ? departureDate : `Select departure date...`}</h1>
                    </div>
                    {(() => {
                        if (departureDateDropdownEnabled)
                            return <FaChevronUp className="text-neutral-700 text-3xl"/>
                        else
                            return <FaChevronDown className="text-neutral-700 text-3xl"/>
                    })()}
                </button>

                {(() => {
                    if (departureDateDropdownEnabled) {
                        return (
                            <div className="w-full max-w-[500px] max-h-[400px] overflow-y-auto  border shadow border-neutral-500 rounded-xl items-center">
                                <Calendar minDate={new Date()} onChange={calenderOnChange} value={calendarValue}/>
                            </div>
                        );
                    }
                })()}

                <button onClick={() => searchFlights()} disabled={isDisabled} className="bg-blue-400 p-3 rounded-lg shadow drop-shadow text-white px-15 mt-2 hover:bg-blue-500 duration-200 ease-linear">
                    Search Flights
                </button>
            </div>
        );
    }

    return renderWidget();
}

export default FlightSettingsWidget;