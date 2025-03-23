export class Flight {
    public departureLocation: {country: string, city: string, airport: string} | null;
    public destination: {country: string, city: string, airport: string} | null;
    public departureDate: string | null;

    public constructor(departureLocation: {country: string, city: string, airport: string} | null, 
                       destination: {country: string, city: string, airport: string} | null,
                       departureDate: string | null) {
        this.departureLocation = departureLocation;
        this.destination = destination;
        this.departureDate = departureDate;
    }
}