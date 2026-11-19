using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServidorNet.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Miembros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Registro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Miembros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Genero = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Temporadas = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MiembroId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.Id);
                    table.CheckConstraint("CK_Series_Estado", "[Estado] IN ('Por ver', 'Viendo', 'Vista')");
                    table.CheckConstraint("CK_Series_Temporadas", "[Temporadas] > 0");
                    table.ForeignKey(
                        name: "FK_Series_Miembros_MiembroId",
                        column: x => x.MiembroId,
                        principalTable: "Miembros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Miembros_Correo",
                table: "Miembros",
                column: "Correo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Series_MiembroId",
                table: "Series",
                column: "MiembroId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "Miembros");
        }
    }
}
