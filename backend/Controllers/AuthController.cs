using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services.Auth;

namespace backend.Controllers
{
    [EnableCors("Default")]
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            return await _authService.Signup(request);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            return await _authService.Login(request);
        }
    }
}
