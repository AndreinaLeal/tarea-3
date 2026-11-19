using Microsoft.EntityFrameworkCore;
using ServidorNet.Modelos;

namespace ServidorNet.Datos;

public class MaratonDbContext(DbContextOptions<MaratonDbContext> opciones) : DbContext(opciones)
{
    public DbSet<Miembro> Miembros => Set<Miembro>();
    public DbSet<Serie> Series => Set<Serie>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Miembro>(m =>
        {
            m.Property(x => x.Nombre).HasMaxLength(80).IsRequired();
            m.Property(x => x.Correo).HasMaxLength(120).IsRequired();
            m.HasIndex(x => x.Correo).IsUnique();
        });

        modelBuilder.Entity<Serie>(s =>
        {
            s.Property(x => x.Titulo).HasMaxLength(120).IsRequired();
            s.Property(x => x.Genero).HasMaxLength(40).IsRequired();
            s.Property(x => x.Estado).HasMaxLength(10).IsRequired();

            s.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Series_Estado", "[Estado] IN ('Por ver', 'Viendo', 'Vista')");
                t.HasCheckConstraint("CK_Series_Temporadas", "[Temporadas] > 0");
            });

            s.HasOne(x => x.Miembro)
             .WithMany(x => x.Series)
             .HasForeignKey(x => x.MiembroId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        DatosIniciales.Sembrar(modelBuilder);
    }
}