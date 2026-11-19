# Tarea 3 — Laboratorios del Maratón de series (Parte A)

Repositorio personal con los laboratorios guiados de React y el Maratón de series en su estado final:
cliente React (con React Router), servidor Express + MongoDB y servidor ASP.NET Core + EF Core + SQL Server.

La evidencia de cada laboratorio está en [`docs/laboratorios.md`](docs/laboratorios.md).

## Estructura

```
tarea-3/
├── docs/                  laboratorios.md y capturas/
├── proyectos-base/        conceptos-react (props, children, eventos, useState)
└── maraton-series/
    ├── cliente/           React + React Router (Vite)
    ├── servidor/          Express + MongoDB
    └── servidor-net/      ASP.NET Core + EF Core + SQL Server
```

## Requisitos

- Node.js 20.6 o superior (el servidor usa `node --env-file`)
- Una base MongoDB (Atlas o local)
- .NET SDK 10.0.404 (lo fija `servidor-net/global.json`)
- SQL Server (LocalDB, Express o contenedor)
- Herramienta de EF Core: `dotnet tool install --global dotnet-ef`

## Cómo ejecutar el Maratón

Los tres procesos van en terminales distintas.

### 1. Servidor Express (puerto 3000)

```bash
cd maraton-series/servidor
cp .env.example .env        # editar MONGODB_URI con su cadena real
npm install
node --env-file=.env src/seed.js   # solo la primera vez: carga miembros y series
npm run dev
```

Variables (`.env.example`): `PORT`, `MONGODB_URI`, `DB_NAME`, `CLIENT_ORIGIN`.

### 2. Cliente React (puerto 5173)

```bash
cd maraton-series/cliente
cp .env.example .env        # VITE_API_URL=http://localhost:3000/api
npm install
npm run dev
```

Abrir http://localhost:5173. Páginas: `/`, `/series` (filtros en la dirección, por ejemplo `?estado=Vista`),
`/series/nueva` y `/series/:id`.

### 3. Servidor .NET (puerto 5256)

La cadena de conexión **no** está en el repositorio: se guarda con user-secrets.
La clave se llama `ConnectionStrings:Maraton`.

```bash
cd maraton-series/servidor-net
dotnet user-secrets set "ConnectionStrings:Maraton" "<su cadena de conexion a SQL Server>"
dotnet ef database update      # crea las tablas y los datos de siembra
dotnet run --launch-profile http
```

Para reconstruir la base desde cero:

```bash
dotnet ef database drop --force
dotnet ef database update
```

Rutas disponibles (mismo JSON que Express): `GET /api/series` y `GET /api/miembros`.
Se pueden probar con `servidor-net/requests.http`.

### Ejecución del proyecto base

```bash
cd proyectos-base/conceptos-react
npm install
npm run dev
```

## Migraciones de servidor-net

| Migración | Qué agrega |
|---|---|
| `Inicial` | Tablas `Miembros` y `Series`, índice único de correo, CHECK y clave foránea |
| `DatosDeSiembra` | Datos de siembra de miembros y series (`HasData`) |
| `GenerosFavoritosDeMiembro` | Tabla `GenerosFavoritos` para el arreglo `generosFavoritos` de Mongo |

## Qué no se versiona

`node_modules/`, `bin/`, `obj/`, `.env` y cualquier secreto. Los `.env.example` sí se incluyen.
