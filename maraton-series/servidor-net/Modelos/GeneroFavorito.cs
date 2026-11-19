namespace ServidorNet.Modelos;

// Una fila por cada elemento del arreglo generosFavoritos de Mongo.
public class GeneroFavorito
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";

    // Clave foránea hacia Miembro
    public int MiembroId { get; set; }
    public Miembro Miembro { get; set; } = null!;
}