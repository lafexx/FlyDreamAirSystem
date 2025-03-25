import { Flight } from "../types/Flight";
import { Dispatch, SetStateAction, useState } from "react";

export type BookingContextType = {
    flight: Flight | null                                       // flight query information to use in flight list widget
    setFlight: Dispatch<SetStateAction<Flight | null>>;
    isSearching: boolean                                        // used to trigger loading screen and to update the active window via context
    setIsSearching: Dispatch<SetStateAction<boolean>>;
    selectedFlight: Flight | null                               // the flight the user selects in the flight list widget used in the seat selection window
    setSelectedFlight: Dispatch<SetStateAction<Flight | null>>;
}
