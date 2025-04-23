export class Flight {
    public username: string;
    public departureLocation: {country: string, city: string, airport: string};
    public destination: {country: string, city: string, airport: string};
    public departureDate: string;
    public price: number;
    public airline: string;
    public seats: number[][];

    public constructor(username: string,
                       departureLocation: {country: string, city: string, airport: string}, 
                       destination: {country: string, city: string, airport: string},
                       departureDate: string,
                       price: number,
                       airline: string,
                       seats: number[][]) {
        this.username = username;
        this.departureLocation = departureLocation;
        this.destination = destination;
        this.departureDate = departureDate;
        this.price = price;
        this.airline = airline;
        this.seats = seats;
    }
}