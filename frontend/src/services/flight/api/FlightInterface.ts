import axios from "axios";
import { Flight } from "../types/Flight";
import { API_BASE_URL } from "../../../config";
interface BookFlightRequest {
    username: string;
    departureLocation: {country: string, city: string, airport: string};
    destination: {country: string, city: string, airport: string};
    departureDate: string;
    arrivalDate: string;
    price: number;
    addons: { [key: string]: number };
    seats: number[][];
}

export async function BookFlight(request: BookFlightRequest): Promise<string> {
    try {
        const response = await axios.post<string>(`${API_BASE_URL}/Flights/book`, request);
        if (response)
            return response.data;
        else
            return "";
    } catch (e) {
        console.warn(e);
        return "";
    }
}

export async function GetBookedFlights(username: string): Promise<Flight[]> {
    try {
        const response = await axios.get<Flight[]>(`${API_BASE_URL}/Flights/user/${username}`);
        if (response)
            return response.data;
        else
            return [];
    } catch (e) {
        console.warn(e);
        return [];
    }
}

export async function GetFlightById(flightId: string): Promise<Flight | null> {
    try {
        const response = await axios.get<Flight>(`${API_BASE_URL}/Flights/${flightId}`);
        const data = response.data;
        if (!data) return null;

        const addonsObj = data.addons as unknown as Record<string, number>;
        const addons = new Map<string, number>(Object.entries(addonsObj));

        return {
            ...data,
            addons
        };
    } catch (e) {
        console.warn(e);
         return null;
    }
}

export async function CancelFlight(flightId: string): Promise<boolean> {
    try {
        const response = await axios.delete(`${API_BASE_URL}/Flights/cancel/${flightId}`);
        if (response)
            return true;
        else
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}