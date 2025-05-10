import { Flight } from "../types/Flight";
import { createContext, Dispatch, SetStateAction, useContext, useState, useMemo } from "react";

export type BookingContextType = {
    flight: Flight                                       // flight query information to use in flight list widget
    setFlight: Dispatch<SetStateAction<Flight>>;
    isSearching: boolean                                        // used to trigger loading screen and to update the active window via context
    setIsSearching: Dispatch<SetStateAction<boolean>>;
    selectedFlight: Flight                               // the flight the user selects in the flight list widget used in the seat selection window
    setSelectedFlight: Dispatch<SetStateAction<Flight>>;
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
    const emptyFlight: Flight = useMemo(() =>  new Flight("", "", {country: "", city: "", airport: ""}, {country: "", city: "", airport: ""}, "", 0, "", []), []);
    const [flight, setFlight] = useState<Flight>(emptyFlight);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight>(emptyFlight);

    return (
        <BookingContext.Provider value={{flight, setFlight,
                                         isSearching, setIsSearching,
                                         selectedFlight, setSelectedFlight
        }}>
            {children}
        </BookingContext.Provider>
    )
};