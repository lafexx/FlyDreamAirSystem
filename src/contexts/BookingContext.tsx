import { Flight } from "../types/Flight";
import { Dispatch, SetStateAction, useState } from "react";

export type BookingContextType = {
    flight: Flight | null
    setFlight: Dispatch<SetStateAction<Flight | null>>;
    isSearching: boolean
    setIsSearching: Dispatch<SetStateAction<boolean>>;
}
