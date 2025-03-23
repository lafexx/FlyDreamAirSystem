import { Flight } from "../types/Flight";
import { Dispatch, SetStateAction, useState } from "react";

export type FlightContextType = {
    flight: Flight | null
    setFlight: Dispatch<SetStateAction<Flight | null>>;
}
