using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Auth
{
    public interface IAuthService
    {
        Task<IActionResult> Signup(SignupRequest request);
        Task<IActionResult> Login(LoginRequest request);
    }
}
