using System.Globalization;
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

// GET /api/miembros: mismo JSON que el servidor Express
app.MapGet("/api/miembros", async (MaratonDbContext bd) =>
{
    var miembros = await bd.Miembros
        .AsNoTracking()
        .OrderBy(m => m.Nombre)
        .Select(m => new
        {
            _id = m.Id.ToString(),
            nombre = m.Nombre,
            correo = m.Correo,
            generosFavoritos = m.GenerosFavoritos.OrderBy(g => g.Id).Select(g => g.Nombre).ToList(),
            registro = m.Registro
        })
        .ToListAsync();

    // La fecha se da formato ISO con Z, como la devuelve Express
    return Results.Ok(miembros.Select(m => new
    {
        m._id,
        m.nombre,
        m.correo,
        m.generosFavoritos,
        registro = m.registro.ToString("yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture)
    }));
});

app.Run();