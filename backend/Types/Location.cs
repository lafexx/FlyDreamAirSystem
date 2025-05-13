namespace backend.Types
{
    public class Location
    {
        public Location() { }

        public Location(string country, string city, string airport)
        {
            this.Country = country;
            this.City = city;
            this.Airport = airport;
        }

        public required string Country { get; set; }
        public required string City { get; set; }
        public required string Airport { get; set; }
    }
}
