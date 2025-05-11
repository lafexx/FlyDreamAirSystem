export class Flight {
    public id: string;
    public username: string;
    public departureLocation: {country: string, city: string, airport: string};
    public destination: {country: string, city: string, airport: string};
    public departureDate: string;
    public arrivalDate: string;
    public price: number;
    public addons: Map<string, number>;
    public seats: number[][];

    public constructor(flight: Flight | null = null,
                       id: string = "",
                       username: string = "",
                       departureLocation: {country: string, city: string, airport: string} = {country: "", city: "", airport: ""}, 
                       destination: {country: string, city: string, airport: string} = {country: "", city: "", airport: ""},
                       departureDate: string = "",
                       arrivalDate: string = "",
                       price: number = 0,
                       addons: Map<string, number> = new Map(),
                       seats: number[][] = []) {
        if (!flight) {
            this.id = id;
            this.username = username;
            this.departureLocation = departureLocation;
            this.destination = destination;
            this.departureDate = departureDate;
            this.arrivalDate = arrivalDate;
            this.price = price;
            this.addons = addons;
            this.seats = seats;
        } else {
            this.id = flight.id;
            this.username = flight.username;
            this.departureLocation = flight.departureLocation;
            this.destination = flight.destination;
            this.departureDate = flight.departureDate;
            this.arrivalDate = flight.arrivalDate;
            this.price = flight.price;
            this.addons = flight.addons;
            this.seats = flight.seats;
        }
    }
}