using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Flight
{
    public interface IFlightService
    {
        Task<IActionResult> BookFlight(BookFlightRequest request);
        Task<IActionResult> GetBookedFlightsByUsername(string username);
        Task<IActionResult> GetFlightByUsernameAndId(string username, string flightId);
        Task<IActionResult> CancelFlight(string username, string flightId);
    }
}
