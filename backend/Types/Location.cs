namespace backend.Types
{
    public class Location
    {
        public Location() { }

        public Location(string country, string city, string airport)
        {
            this.country = country;
            this.city = city;
            this.airport = airport;
        }

        public string country { get; set; }
        public string city { get; set; }
        public string airport { get; set; }
    }
}
