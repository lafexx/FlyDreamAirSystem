using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Services.Flight
{
    public class FlightService: IFlightService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string flightsFileName = "flights.json";

        public FlightService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> BookFlight(BookFlightRequest request)
        {
            var flightsFilePath = Path.Combine(_webHostEnvironment.WebRootPath, flightsFileName);

            if (!File.Exists(flightsFilePath))
                File.WriteAllText(flightsFilePath, "[]");

            var json = await File.ReadAllTextAsync(flightsFilePath);
            var flights = JsonConvert.DeserializeObject<List<Models.Flight>>(json) ?? new List<Models.Flight>();

            Models.Flight newFlight = new(request.username, request.departureLocation, request.destination, request.departureDate, request.price, request.airline, request.seats);
            flights.Add(newFlight);

            var updatedJson = JsonConvert.SerializeObject(flights, Formatting.Indented);
            await File.WriteAllTextAsync(flightsFilePath, updatedJson);

            return new OkObjectResult(new { message = "Sucessfully booked flight." });
        }
    }
}
