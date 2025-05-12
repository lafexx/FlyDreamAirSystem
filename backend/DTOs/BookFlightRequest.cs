using backend.Types;

namespace backend.Models
{
    public class BookFlightRequest
    {
        public required string id { get; set; }
        public required string username { get; set; }
        public required Location departureLocation { get; set; }
        public required Location destination { get; set; }
        public required string departureDate { get; set; }
        public required string arrivalDate { get; set; }
        public required double price { get; set; }
        public required Dictionary<string, int> addons { get; set; }
        public required int[][] seats { get; set; }
    }
}
