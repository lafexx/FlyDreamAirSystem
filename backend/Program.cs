using backend.Services.Auth;
using backend.Services.Flight;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(context =>
{
    context.AddPolicy("Default", policy =>
    {
        policy.WithOrigins(Environment.GetEnvironmentVariable("ASPNETCORE_FRONTEND_ORIGIN") ?? "http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IFlightService, FlightService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("Default");
app.UseAuthorization();
app.MapControllers();
app.Run();
