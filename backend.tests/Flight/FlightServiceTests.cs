using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services.Flight;
using backend.Types;

using Moq;

namespace backend.tests.Flight
{
    public class FlightServiceFixture
    {
        public FlightService flightService;

        public FlightServiceFixture()
        {
            var environmentMock = new Mock<IWebHostEnvironment>();
            environmentMock
                .Setup(e => e.WebRootPath)
                .Returns("TestData");

            flightService = new FlightService(environmentMock.Object);
        }
    }
    
    public class FlightServiceTests: IClassFixture<FlightServiceFixture>
    {
        private readonly FlightService _flightService;

        public FlightServiceTests(FlightServiceFixture fixture)
        {
            _flightService = fixture.flightService;
        }

        [Fact]
        public async Task BookFlight_SuccessfullyBooksFlight()
        {
            // Arrange
            var request = new BookFlightRequest
            {
                id = "",
                username = "test_username",
                departureLocation = new Location { Country = "France", City = "Paris", Airport = "Charles de Gaulle" },
                destination = new Location { Country = "USA", City = "Boston", Airport = "Logan International Airport" },
                departureDate = "01/05/2025",
                arrivalDate = "02/05/2025",
                price = 1500.0,
                addons = [],
                seats = [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ]
            };

            // Act
            var result = await _flightService.BookFlight(request) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Contains("Successfully booked", result.Value is not null ? result.Value.ToString() : "");
        }

        [Fact]
        public async Task GetBookedFlightsByUsername_ReturnsBookedFlights()
        {
            // Arrange
            string username = "test_username";

            // Act
            var result = await _flightService.GetBookedFlightsByUsername(username) as OkObjectResult;
            var flights = Assert.IsAssignableFrom<List<backend.Models.Flight>>(result?.Value);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.All(flights, f => Assert.Equal(username, f.Username));
        }

        [Fact]
        public async Task CancelFlight_RemovesFlightFromFlightData()
        {
            // Arrange
            string username = "test_username";
            string flightIdToCancel = "4766453f-6af5-4eb2-ae1f-4bd18b7e534d";

            // Act
            var result = await _flightService.CancelFlight(username, flightIdToCancel) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Contains("successfully cancelled", result?.Value?.ToString());

            var checkResult = await _flightService.GetFlightByUsernameAndId(username, flightIdToCancel) as OkObjectResult;
            Assert.Null(checkResult?.Value); 
        }
    }
}
