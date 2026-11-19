using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ServidorNet.Migrations
{
    /// <inheritdoc />
    public partial class DatosDeSiembra : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Miembros",
                columns: new[] { "Id", "Correo", "Nombre", "Registro" },
                values: new object[,]
                {
                    { 1, "ana@correo.com", "Ana", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "luis@correo.com", "Luis", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "maria@correo.com", "María", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "carlos@correo.com", "Carlos", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Series",
                columns: new[] { "Id", "Estado", "Genero", "MiembroId", "Temporadas", "Titulo" },
                values: new object[,]
                {
                    { 1, "Vista", "Drama", 1, 5, "Breaking Bad" },
                    { 2, "Viendo", "Comedia", 2, 9, "The Office" },
                    { 3, "Por ver", "Ciencia ficción", 3, 3, "Dark" },
                    { 4, "Viendo", "Ciencia ficción", 4, 4, "Stranger Things" },
                    { 5, "Vista", "Drama", 1, 1, "Chernobyl" },
                    { 6, "Por ver", "Documental", 2, 2, "Planeta Tierra" },
                    { 7, "Por ver", "Comedia", 3, 2, "Wednesday" },
                    { 8, "Viendo", "Drama", 4, 2, "The Last of Us" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Series",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
