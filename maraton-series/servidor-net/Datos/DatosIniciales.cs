using Microsoft.EntityFrameworkCore;
using ServidorNet.Modelos;

namespace ServidorNet.Datos;

// Datos de siembra: los mismos miembros, géneros favoritos y series del seed.js de Express.
// HasData necesita ids fijos y fechas fijas, para que la migracion sea siempre la misma.
public static class DatosIniciales
{
    public static void Sembrar(ModelBuilder modelBuilder)
    {
        var registro = new DateTime(2026, 11, 11, 1, 30, 48, 692);

        modelBuilder.Entity<Miembro>().HasData(
            new Miembro { Id = 1, Nombre = "Ana",    Correo = "ana@correo.com",    Registro = registro },
            new Miembro { Id = 2, Nombre = "Luis",   Correo = "luis@correo.com",   Registro = registro },
            new Miembro { Id = 3, Nombre = "María",  Correo = "maria@correo.com",  Registro = registro },
            new Miembro { Id = 4, Nombre = "Carlos", Correo = "carlos@correo.com", Registro = registro }
        );

        // El Id conserva el orden del arreglo original de Mongo
        modelBuilder.Entity<GeneroFavorito>().HasData(
            new GeneroFavorito { Id = 1, MiembroId = 1, Nombre = "Drama" },
            new GeneroFavorito { Id = 2, MiembroId = 1, Nombre = "Documental" },
            new GeneroFavorito { Id = 3, MiembroId = 2, Nombre = "Comedia" },
            new GeneroFavorito { Id = 4, MiembroId = 3, Nombre = "Ciencia ficción" },
            new GeneroFavorito { Id = 5, MiembroId = 3, Nombre = "Terror" },
            new GeneroFavorito { Id = 6, MiembroId = 4, Nombre = "Acción" },
            new GeneroFavorito { Id = 7, MiembroId = 4, Nombre = "Drama" }
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