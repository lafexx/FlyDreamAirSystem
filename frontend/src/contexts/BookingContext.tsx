import { Flight } from "../services/flight/types/Flight";
import { createContext, Dispatch, SetStateAction, useContext, useState, useMemo } from "react";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type BookingContextType = {
    flight: Flight                                       // flight query information to use in flight list widget
    setFlight: Dispatch<SetStateAction<Flight>>;
    isSearching: boolean                                        // used to trigger loading screen and to update the active window via context
    setIsSearching: Dispatch<SetStateAction<boolean>>;
    selectedFlight: Flight                               // the flight the user selects in the flight list widget used in the seat selection window
    setSelectedFlight: Dispatch<SetStateAction<Flight>>;
    departureLocation: { country: string, city: string, airport: string};
    setDepartureLocation: Dispatch<SetStateAction<{ country: string, city: string, airport: string}>>;
    destination: { country: string, city: string, airport: string};
    setDestination: Dispatch<SetStateAction<{ country: string, city: string, airport: string}>>;
    departureDate: string | null;
    setDepartureDate: Dispatch<SetStateAction<string | null>>;
    calendarValue: Value;
    calendarOnChange: Dispatch<SetStateAction<Value>>;
};

export const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
    const bookingContext = useContext(BookingContext);
    if (!bookingContext) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return bookingContext;
}

export const BookingProvider = ({children}: {children: React.ReactNode}) => {
    const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", "", 0, []), []);
    const [flight, setFlight] = useState<Flight>(emptyFlight);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight>(emptyFlight);

    const emptyLocation: {country: string, city: string, airport: string} = useMemo(() => ({country: "", city: "", airport: ""}), []);
    const [departureLocation, setDepartureLocation] = useState<{ country: string, city: string, airport: string }>(emptyLocation);
    const [destination, setDestination] = useState<{ country: string, city: string, airport: string }>(emptyLocation);
    
    const [departureDate, setDepartureDate] = useState<string | null>(null);
    const [calendarValue, calendarOnChange] = useState<Value>(null);

    return (
        <BookingContext.Provider value={{flight, setFlight,
                                         isSearching, setIsSearching,
                                         selectedFlight, setSelectedFlight,
                                         departureLocation, setDepartureLocation,
                                         destination, setDestination,
                                         departureDate, setDepartureDate,
                                         calendarValue, calendarOnChange
        }}>
            {children}
        </BookingContext.Provider>
    )
};