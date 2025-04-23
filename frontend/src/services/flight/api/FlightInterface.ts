import axios from "axios";

const flightBaseEndpoint = "https://localhost:7082/Flight";

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
