using Microsoft.AspNetCore.Hosting;

using backend.Services.Auth;

using Moq;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.tests.Auth
{
    public class AuthServiceFixture
    {
        public IWebHostEnvironment environment;
        public AuthService authService;

        public AuthServiceFixture()
        {
            var environmentMock = new Mock<IWebHostEnvironment>();

            environmentMock
                .Setup(e => e.WebRootPath)
                .Returns("TestData");

            environment = environmentMock.Object;

            authService = new AuthService(environment);
        }
    }

    public class AuthServiceTests: IClassFixture<AuthServiceFixture>
    {
        private readonly AuthServiceFixture _fixture;
        private readonly AuthService _auth;

        public AuthServiceTests(AuthServiceFixture fixture)
        {
            _fixture = fixture;
            _auth = fixture.authService;

            string usersFilePath = Path.Combine(_fixture.environment.WebRootPath, "users.json");
            File.WriteAllText(usersFilePath, "[{\"username\": \"test_username\", \"email\": \"test_username@test.com\", \"password\": \"testpassword123\"}]");
        }

        [Fact(DisplayName = "rejects a sign up request if the requested username is already taken")]
        public async Task Signup_RejectsIfUsernameIsTaken()
        {
            SignupRequest request = new SignupRequest
            {
                Username = "test_username",
                Email = "test_username@test.com",
                Password = "testpassword123"
            };

            IActionResult result = await _auth.Signup(request);

            BadRequestObjectResult badReq = Assert.IsType<BadRequestObjectResult>(result);
            dynamic value = badReq.Value;
            Assert.Equal("A user with the same username already exists!", value.message);
        }

        [Fact(DisplayName = "rejects a sign up request if the requested email is already taken")]
        public async Task Signup_RejectsIfEmailIsTaken()
        {
            SignupRequest request = new SignupRequest
            {
                Username = "unique_username",
                Email = "test_username@test.com",
                Password = "testpassword123"
            };

            IActionResult result = await _auth.Signup(request);

            BadRequestObjectResult badReq = Assert.IsType<BadRequestObjectResult>(result);
            dynamic value = badReq.Value;
            Assert.Equal("A user with the same email already exists!", value.message);
        }

        [Fact(DisplayName = "successfully signs a user up if the request is valid")]
        public async Task Signup_AcceptsValidRequests()
        {
            SignupRequest request = new SignupRequest
            {
                Username = "unique_username",
                Email = "unique_username@test.com",
                Password = "uniquepassword123"
            };

            IActionResult result = await _auth.Signup(request);

            OkObjectResult okRes = Assert.IsType<OkObjectResult>(result);
            dynamic value = okRes.Value;
            Assert.Equal("Sucessfully registered user.", value.message);
        }
    }
}
