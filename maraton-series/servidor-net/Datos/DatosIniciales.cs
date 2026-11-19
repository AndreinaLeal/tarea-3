using Microsoft.EntityFrameworkCore;
using ServidorNet.Modelos;

namespace ServidorNet.Datos;

// Datos de siembra: los mismos 4 miembros y 8 series del seed.js de Express.
// HasData necesita ids fijos y fechas fijas, para que la migracion sea siempre la misma.
public static class DatosIniciales
{
    public static void Sembrar(ModelBuilder modelBuilder)
    {
        var fecha = new DateTime(2026, 1, 1);

        modelBuilder.Entity<Miembro>().HasData(
            new Miembro { Id = 1, Nombre = "Ana",    Correo = "ana@correo.com",    Registro = fecha },
            new Miembro { Id = 2, Nombre = "Luis",   Correo = "luis@correo.com",   Registro = fecha },
            new Miembro { Id = 3, Nombre = "María",  Correo = "maria@correo.com",  Registro = fecha },
            new Miembro { Id = 4, Nombre = "Carlos", Correo = "carlos@correo.com", Registro = fecha }
        );

        modelBuilder.Entity<Serie>().HasData(
            new Serie { Id = 1, Titulo = "Breaking Bad",    Genero = "Drama",           Temporadas = 5, Estado = "Vista",   MiembroId = 1 },
            new Serie { Id = 2, Titulo = "The Office",      Genero = "Comedia",         Temporadas = 9, Estado = "Viendo",  MiembroId = 2 },
            new Serie { Id = 3, Titulo = "Dark",            Genero = "Ciencia ficción", Temporadas = 3, Estado = "Por ver", MiembroId = 3 },
            new Serie { Id = 4, Titulo = "Stranger Things", Genero = "Ciencia ficción", Temporadas = 4, Estado = "Viendo",  MiembroId = 4 },
            new Serie { Id = 5, Titulo = "Chernobyl",       Genero = "Drama",           Temporadas = 1, Estado = "Vista",   MiembroId = 1 },
            new Serie { Id = 6, Titulo = "Planeta Tierra",  Genero = "Documental",      Temporadas = 2, Estado = "Por ver", MiembroId = 2 },
            new Serie { Id = 7, Titulo = "Wednesday",       Genero = "Comedia",         Temporadas = 2, Estado = "Por ver", MiembroId = 3 },
            new Serie { Id = 8, Titulo = "The Last of Us",  Genero = "Drama",           Temporadas = 2, Estado = "Viendo",  MiembroId = 4 }
        );
    }
}