using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ServidorNet.Migrations
{
    /// <inheritdoc />
    public partial class GenerosFavoritosDeMiembro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GenerosFavoritos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    MiembroId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenerosFavoritos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenerosFavoritos_Miembros_MiembroId",
                        column: x => x.MiembroId,
                        principalTable: "Miembros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "GenerosFavoritos",
                columns: new[] { "Id", "MiembroId", "Nombre" },
                values: new object[,]
                {
                    { 1, 1, "Drama" },
                    { 2, 1, "Documental" },
                    { 3, 2, "Comedia" },
                    { 4, 3, "Ciencia ficción" },
                    { 5, 3, "Terror" },
                    { 6, 4, "Acción" },
                    { 7, 4, "Drama" }
                });

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registro",
                value: new DateTime(2026, 11, 11, 1, 30, 48, 692, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registro",
                value: new DateTime(2026, 11, 11, 1, 30, 48, 692, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registro",
                value: new DateTime(2026, 11, 11, 1, 30, 48, 692, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registro",
                value: new DateTime(2026, 11, 11, 1, 30, 48, 692, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_GenerosFavoritos_MiembroId_Nombre",
                table: "GenerosFavoritos",
                columns: new[] { "MiembroId", "Nombre" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenerosFavoritos");

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registro",
                value: new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registro",
                value: new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registro",
                value: new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Miembros",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registro",
                value: new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
