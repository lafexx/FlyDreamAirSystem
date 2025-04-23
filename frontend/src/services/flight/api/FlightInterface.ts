import axios from "axios";
import { Flight } from "../../../types/Flight";

const flightBaseEndpoint = "https://localhost:7082/Flights";

interface BookFlightRequest {
    username: string;
    departureLocation: {country: string, city: string, airport: string};
    destination: {country: string, city: string, airport: string};
    departureDate: string;
    price: number;
    airline: string;
    seats: number[][];
}

export async function BookFlight(request: BookFlightRequest): Promise<boolean> {
    try {
        const response = await axios.post(`${flightBaseEndpoint}/book`, request);
        if (response)
            return true;
        else
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export async function GetBookedFlights(username: string): Promise<Flight[]> {
    try {
        const response = await axios.get<Flight[]>(`${flightBaseEndpoint}/${username}`);
        if (response)
            return response.data;
        else
            return [];
    } catch (e) {
        console.warn(e);
        return [];
    }
}

export async function GetFlightByUsernameAndId(username: string, flightId: string): Promise<Flight | null> {
    try {
        const response = await axios.get<Flight>(`${flightBaseEndpoint}/${username}/${flightId}`);
        if (response.data)
            return response.data;
        else 
            return null;
    } catch (e) {
        console.warn(e);
        return null;
    }
}

export async function CancelFlight(username: string, flightId: string): Promise<boolean> {
    try {
        const response = await axios.delete(`${flightBaseEndpoint}/cancel/${username}/${flightId}`);
        if (response)
            return true;
        else
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}