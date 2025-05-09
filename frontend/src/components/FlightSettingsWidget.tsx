import { useState, useContext, useEffect, useMemo } from "react";

import { BookingContext } from "../services/flight/components/PrimaryWidget";

import Calendar from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';

import LoadingCircleSpinner from "./animations/LoadingCircleSpinner";

import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { div } from "motion/react-client";

const FlightSettingsWidget = () => {
    const bookingContext = useContext(BookingContext);
    const { setFlight, isSearching, setIsSearching } = bookingContext!; 


    const emptyLocation: {country: string, city: string, airport: string} = useMemo(() => ({country: "", city: "", airport: ""}), []);
    const [departureLocation, setDepartureLocation] = useState<{
        country: string,
        city: string,
        airport: string
    }>(emptyLocation);

    const [destination, setDestination] = useState<{
        country: string,
        city: string,
        airport: string
    }>(emptyLocation);

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [departureDate, setDepartureDate] = useState<string | null>(null);
    const [calendarValue, calenderOnChange] = useState<Value>();

    const [departureLocationDropdownEnabled, setDepartureLocationDropdownEnabled] = useState<boolean>(false);
    const [destinationDropdownEnabled, setDestinationDropdownEnabled] = useState<boolean>(false);
    const [departureDateDropdownEnabled, setDepartureDateDropdownEnabled] = useState<boolean>(false);

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
            id: "",
            username: "",
            departureLocation: departureLocation,
            destination: destination,
            departureDate: calendarValue?.toLocaleString()!.split(",")[0]!,
            price: 0,
            airline: "",
            seats: []
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
                    className={`rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
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
                    className={`rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
                <h1 className="text-neutral-800 font-semibold">{location.city}, {location.country}</h1>
                <p className="text-sm text-neutral-600">{location.airport}</p>
            </button>
        ))
    };

    const searchFlights = () => {
        if (departureLocation && destination && departureDate) {
            if (departureLocation.airport !== destination.airport) {
                setIsSearching(true);
            }
        }
    };

    const renderWidget = () => {
        if (isSearching)
            return (
                <div className="text-center space-y-5">
                    <h1 className="text-neutral-600 text-xl">Searching flights...</h1>
                    <LoadingCircleSpinner/>
                </div>
            );

        return (
            <div>
                <div className="w-full h-full flex justify-between p-4 space-x-4">
                    <div className="w-full h-full">
                        <h1>From</h1>
                        <button onClick={() => {
                            setDestinationDropdownEnabled(false);
                            setDepartureDateDropdownEnabled(false);
                            setDepartureLocationDropdownEnabled((prev) => !prev);
                        }} className="flex justify-between h-[70px] w-full border cursor-pointer shadow border-neutral-500  p-4 space-x-4 items-center">
                            <div className="space-x-4">
                                <PiAirplaneTakeoffFill className="inline text-neutral-700 text-2xl"/>
                                <h1 className="inline text-xs text-neutral-600">{departureLocation !== emptyLocation ? `${departureLocation.airport}, ${departureLocation.city}, ${departureLocation.country}` : `Select departure location...`}</h1>
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
                                <h1 className="inline text-xs text-neutral-600">{destination !== emptyLocation ? `${destination.airport}, ${destination.city}, ${destination.country}` : `Select destination...`}</h1>
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
                                <h1 className="inline text-sm text-neutral-600">{departureDate !== null ? departureDate : `Select departure date...`}</h1>
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
                        <div className="absolute z-10 left-149 top-40 blur-none w-full max-w-[500px] max-h-[400px] overflow-y-auto bg-white border shadow border-neutral-500 space-y-4  p-4 items-center">
                            <Calendar minDate={new Date()} onChange={calenderOnChange} value={calendarValue}/>
                        </div>
                    )}
                </div>

                <div className="flex justify-center pb-10">
                    <button
                        disabled={departureLocation.country == "" || destination.country == "" || departureDate == null}
                        onClick={() => searchFlights()} className="bg-blue-700 disabled:opacity-50 p-3 rounded-2xl shadow drop-shadow text-white px-15 mt-2 not-disabled:hover:bg-blue-500 duration-100 ease-linear">
                        Search Flights
                    </button>
                </div>
            </div>
        );
    }

    return renderWidget();
}

export default FlightSettingsWidget;