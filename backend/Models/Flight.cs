using backend.Types;

namespace backend.Models
{
    public class Flight
    {
        public Flight(Guid id, string username, Location departureLocation, Location destination, string departureDate, string arrivalDate, double price, Dictionary<string, int> addons, int[][] seats)
        {
            Id = id;
            Username = username;
            DepartureLocation = departureLocation;
            Destination = destination;
            DepartureDate = departureDate;
            ArrivalDate = arrivalDate;
            Price = price;
            Addons = addons;
            Seats = seats;
        }

        public Guid Id { get; set; }
        public string Username { get; set; }
        public Location DepartureLocation { get; set; }
        public Location Destination { get; set; }
        public string DepartureDate { get; set; }
        public string ArrivalDate {get; set;}
        public double Price { get; set; }
        public Dictionary<string, int> Addons {get; set;}
        public int[][] Seats { get; set; }
    }
}
