using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Flight
{
    public interface IFlightService
    {
        Task<IActionResult> BookFlight(BookFlightRequest request);
    }
}
