using backend.Types;

namespace backend.Models
{
    public class Flight
    {
        public Flight(string username, Location departureLocation, Location destination, string departureDate, double price, string airline, int[][] seats)
        {
            this.username = username;
            this.departureLocation = departureLocation;
            this.destination = destination;
            this.departureDate = departureDate;
            this.price = price;
            this.airline = airline;
            this.seats = seats;
        }

        public string username { get; set; }

        public Location departureLocation { get; set; }
        public Location destination { get; set; }
        public string departureDate { get; set; }
        public double price { get; set; }
        public string airline { get; set; }
        public int[][] seats { get; set; }
    }
}
