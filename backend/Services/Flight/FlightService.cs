using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json;

namespace backend.Services.Flight
{
    public class FlightService: IFlightService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string flightsFileName = "flights.json";
        private readonly string flightsFilePath;


        public FlightService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            flightsFilePath = Path.Combine(_webHostEnvironment.WebRootPath, flightsFileName);
        }

        public async Task<IActionResult> BookFlight(BookFlightRequest request)
        {
            var flights = await LoadFlights();

            Models.Flight newFlight = new(Guid.NewGuid(), request.username, request.departureLocation, request.destination, request.departureDate, request.price, request.airline, request.seats);
            flights.Add(newFlight);

            var updatedJson = JsonConvert.SerializeObject(flights, Formatting.Indented);
            await File.WriteAllTextAsync(flightsFilePath, updatedJson);

            return new OkObjectResult(new { message = "Successfully booked flight." });
        }

        public async Task<IActionResult> GetBookedFlightsByUsername(string username)
        {
            var flights = await LoadFlights();
            List<Models.Flight> userFlights = flights.Where(f => f.username == username).ToList();

            return new OkObjectResult(userFlights);
        }

        public async Task<IActionResult> GetFlightByUsernameAndId(string username, string flightId)
        {
            Guid _flightId = Guid.Parse(flightId);
            var flights = await LoadFlights();
            var flight = flights.FirstOrDefault(f => f.id == _flightId && f.username == username);
            return new OkObjectResult(flight);
        }

        public async Task<IActionResult> CancelFlight(string username, string flightId)
        {
            Guid _flightId = Guid.Parse(flightId);

            var flights = await LoadFlights();
            flights = flights .Where(f => !(f.username == username && f.id == _flightId)).ToList();

            var updatedJson = JsonConvert.SerializeObject(flights, Formatting.Indented);
            await File.WriteAllTextAsync(flightsFilePath, updatedJson);

            return new OkObjectResult(new { message = "Flight successfully cancelled." });
        }

        private async Task<List<Models.Flight>> LoadFlights()
        {
            if (!File.Exists(flightsFilePath))
                File.WriteAllText(flightsFilePath, "[]");

            var json = await File.ReadAllTextAsync(flightsFilePath);
            List<Models.Flight> loadedFlights = JsonConvert.DeserializeObject<List<Models.Flight>>(json) ?? new List<Models.Flight>();

            return loadedFlights;
        }
    }
}
