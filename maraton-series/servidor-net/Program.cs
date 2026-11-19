using Microsoft.EntityFrameworkCore;
using ServidorNet.Datos;

var builder = WebApplication.CreateBuilder(args);

// La cadena de conexión sale de user-secrets, nunca del código ni de appsettings.json
builder.Services.AddDbContext<MaratonDbContext>(opciones =>
    opciones.UseSqlServer(builder.Configuration.GetConnectionString("Maraton")));

var app = builder.Build();

app.MapGet("/", () => "Servidor .NET del Maraton de series");

app.Run();
