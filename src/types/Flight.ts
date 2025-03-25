export class Flight {
    public departureLocation: {country: string, city: string, airport: string} | null;
    public destination: {country: string, city: string, airport: string} | null;
    public departureDate: string | null;
    public price: number | undefined;
    public airline: string | undefined;
    public seats: number[][] | undefined;

    public constructor(departureLocation: {country: string, city: string, airport: string} | null, 
                       destination: {country: string, city: string, airport: string} | null,
                       departureDate: string | null,
                       price: number | undefined = undefined,
                       airline: string | undefined = undefined,
                       seats: number[][] | undefined = undefined) {
        this.departureLocation = departureLocation;
        this.destination = destination;
        this.departureDate = departureDate;
        this.price = price;
        this.airline = airline;
        this.seats = seats;
    }
}