﻿using backend.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Auth
{
    public class AuthService: IAuthService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string usersFileName = "users.json";

        public AuthService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> Signup(SignupRequest request)
        {
            var usersFilePath = Path.Combine(_webHostEnvironment.WebRootPath, usersFileName);

            if (!File.Exists(usersFilePath))
                File.WriteAllText(usersFilePath, "[]");

            var json = await File.ReadAllTextAsync(usersFilePath);
            var users = JsonConvert.DeserializeObject<List<User>>(json) ?? new List<User>();

            User newUser = new(request.FirstName, request.LastName, request.Email, request.Password);

            var user = users.FirstOrDefault(u => u.Email == request.Email);
            if (user != null)
                return new BadRequestObjectResult(new { message = "A user with the same email already exists!" });

            users.Add(newUser);

            var updatedJson = JsonConvert.SerializeObject(users, Formatting.Indented);
            await File.WriteAllTextAsync(usersFilePath, updatedJson);

            return new OkObjectResult(new { message = "Sucessfully registered user." });
        }

        public async Task<IActionResult> Login(LoginRequest request)
        {
            var usersFilePath = Path.Combine(_webHostEnvironment.WebRootPath, usersFileName);

            if (!File.Exists(usersFilePath))
                File.WriteAllText(usersFilePath, "[]");

            var json = await File.ReadAllTextAsync(usersFilePath);
            var users = JsonConvert.DeserializeObject<List<User>>(json) ?? [];

            var user = users.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);
            if (user == null)
                return new UnauthorizedObjectResult(new { message = "Invalid username or password." });
           
            return new OkObjectResult(new { message = "Login successful." });
        }
    }
}
