namespace ServidorNet.Modelos;

public class Miembro
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Correo { get; set; } = "";
    public DateTime Registro { get; set; }

    // Un miembro propone muchas series (relación 1 a muchos)
    public List<Serie> Series { get; set; } = [];

    // Un miembro tiene varios géneros favoritos (relación 1 a muchos)
    public List<GeneroFavorito> GenerosFavoritos { get; set; } = [];
}