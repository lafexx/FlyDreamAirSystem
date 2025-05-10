export class Flight {
    public id: string;
    public username: string;
    public departureLocation: {country: string, city: string, airport: string};
    public destination: {country: string, city: string, airport: string};
    public departureDate: string;
    public arrivalDate: string;
    public price: number;
    public seats: number[][];

    public constructor(id: string,
                        username: string,
                       departureLocation: {country: string, city: string, airport: string}, 
                       destination: {country: string, city: string, airport: string},
                       departureDate: string,
                       arrivalDate: string,
                       price: number,
                       seats: number[][]) {
        this.id = id;
        this.username = username;
        this.departureLocation = departureLocation;
        this.destination = destination;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.seats = seats;
    }
}