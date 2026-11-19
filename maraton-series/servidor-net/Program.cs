using Microsoft.EntityFrameworkCore;
using ServidorNet.Datos;

var builder = WebApplication.CreateBuilder(args);

// La cadena de conexión sale de user-secrets, nunca del código ni de appsettings.json
builder.Services.AddDbContext<MaratonDbContext>(opciones =>
    opciones.UseSqlServer(builder.Configuration.GetConnectionString("Maraton")));

var app = builder.Build();

app.MapGet("/", () => "Servidor .NET del Maraton de series");

// GET /api/series: mismo JSON que el servidor Express
app.MapGet("/api/series", async (MaratonDbContext bd) =>
{
    var series = await bd.Series
        .AsNoTracking()
        .OrderBy(s => s.Titulo)
        .Select(s => new
        {
            _id = s.Id.ToString(),
            titulo = s.Titulo,
            genero = s.Genero,
            temporadas = s.Temporadas,
            estado = s.Estado,
            miembroId = s.MiembroId.ToString(),
            miembro = s.Miembro.Nombre
        })
        .ToListAsync();

    return Results.Ok(series);
});

app.Run();
