using backend.Models;
using backend.Services.Flight;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [EnableCors("Default")]
    [Route("[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpPost("book")]
        public async Task<IActionResult> BookFlight([FromBody] BookFlightRequest request)
        {
            return await _flightService.BookFlight(request);
        }

        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetBookedFlights([FromRoute] string email)
        {
            return await _flightService.GetBookedFlightsByUsername(email);
        }

        [HttpGet("{username}/{flightId}")]
        public async Task<IActionResult> GetFlightByUsernameAndId([FromRoute] string username, [FromRoute] string flightId)
        {
            return await _flightService.GetFlightByUsernameAndId(username, flightId);
        }

        [HttpGet("{flightId}")]
        public async Task<IActionResult> GetFlightById([FromRoute] string flightId)
        {
            return await _flightService.GetFlightById(flightId);
        }

        [HttpDelete("cancel/{username}/{flightId}")]
        public async Task<IActionResult> CancelFlight([FromRoute] string username, [FromRoute] string flightId)
        {
            return await _flightService.CancelFlight(username, flightId);
        }
    }
}
