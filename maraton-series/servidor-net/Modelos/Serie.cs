namespace ServidorNet.Modelos;

public class Serie
{
    public int Id { get; set; }
    public string Titulo { get; set; } = "";
    public string Genero { get; set; } = "";
    public int Temporadas { get; set; }
    public string Estado { get; set; } = "Por ver";

    // Clave foránea hacia Miembro
    public int MiembroId { get; set; }
    public Miembro Miembro { get; set; } = null!;
}