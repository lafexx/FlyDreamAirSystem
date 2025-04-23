using backend.Types;

namespace backend.Models
{
    public class BookFlightRequest
    {
        public string username { get; set; }
        public Location departureLocation { get; set; }
        public Location destination { get; set; }
        public string departureDate { get; set; }
        public double price { get; set; }
        public string airline { get; set; }
        public int[][] seats { get; set; }
    }
}
