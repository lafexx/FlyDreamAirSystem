using backend.Models;
using backend.Services.Flight;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [EnableCors("Default")]
    [Route("[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpPost("book")]
        public async Task<IActionResult> BookFlight([FromBody] BookFlightRequest request)
        {
            return await _flightService.BookFlight(request);
        }
    }
}
