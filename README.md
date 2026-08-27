# Smart Places

Smart Places es una aplicación full stack para descubrir y registrar lugares de interés para viajes y escapadas. El usuario describe lo que busca en lenguaje natural y la aplicación convierte esa consulta en filtros, busca coincidencias en PostgreSQL y muestra los resultados en tarjetas y sobre un mapa.

## Funcionalidades

- Búsqueda de lugares mediante una consulta escrita en lenguaje natural.
- Interpretación de la consulta con OpenAI para extraer provincia, ciudad, tipo, características, etiquetas y precio máximo.
- Resumen breve generado por IA a partir de los resultados encontrados.
- Visualización de los lugares en tarjetas y marcadores sobre un mapa.
- Alta de lugares con datos descriptivos, coordenadas, precio, características, etiquetas e imagen opcional.
- Edición y eliminación de lugares mediante la API REST.
- Límite de 20 peticiones de búsqueda cada 15 minutos para el endpoint que utiliza IA.

## Tecnologías

### Frontend

- React 19 con TypeScript.
- Vite.
- React Router para las rutas `/` y `/create`.
- Tailwind CSS 4.
- Leaflet y React Leaflet, con teselas de OpenStreetMap.
- React Icons.

### Backend

- Node.js 22 en Docker.
- Express 5 y TypeScript.
- `pg` para acceder a PostgreSQL.
- OpenAI Responses API con el modelo `gpt-5.4-mini`.
- Multer para recibir imágenes en memoria.
- Cloudinary para almacenar imágenes.
- CORS, `dotenv` y `express-rate-limit`.

## Arquitectura

El frontend es una SPA independiente creada con Vite. Consume el backend mediante `VITE_API_URL`, gestiona la navegación con React Router y presenta los lugares devueltos por la API.

El backend expone una API Express bajo `/places`. El flujo de búsqueda es:

1. El frontend envía una consulta de texto.
2. OpenAI la transforma en un objeto de filtros.
3. El controlador construye una consulta parametrizada para PostgreSQL.
4. Los resultados se envían de nuevo a OpenAI para generar un resumen corto.
5. La respuesta contiene `places` y `summary`.

Las imágenes recibidas al crear un lugar pasan por Multer y se suben a Cloudinary; la URL segura resultante se guarda en PostgreSQL.

## Estructura principal

```text
.
├── backend/
│   ├── app.ts                         # Configuración de Express y CORS
│   ├── server.ts                      # Arranque y comprobación de PostgreSQL
│   ├── src/
│   │   ├── controllers/               # Lógica de búsqueda
│   │   ├── db/                        # Pool de PostgreSQL
│   │   ├── middlewares/               # Recepción de archivos con Multer
│   │   ├── routes/                    # Endpoints de places
│   │   └── services/                  # OpenAI y Cloudinary
│   └── test/test-openai.ts            # Prueba manual de la integración OpenAI
├── db/init.sql                        # Esquema y datos iniciales
├── frontend/
│   ├── src/
│   │   ├── components/                # Navbar, mapa, tarjetas y formularios
│   │   ├── pages/                     # Home y Create
│   │   └── services/api.ts            # Cliente HTTP del frontend
│   ├── index.html
│   └── vite.config.js
├── docker-compose.yml
└── tsconfig.json
```

## Requisitos

- Node.js 22 o compatible con las versiones definidas en los Dockerfiles.
- npm.
- PostgreSQL local o una instancia PostgreSQL gestionada, como Neon.
- Una cuenta y credenciales de OpenAI y Cloudinary para activar esas integraciones.

## Instalación y ejecución local

### Opción 1: Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto inicia:

- Frontend en `http://localhost:5173`.
- Backend en `http://localhost:3000`.
- PostgreSQL 17 en `localhost:5432`.

La base de datos local utiliza el volumen `postgres_data` y ejecuta `db/init.sql` al inicializarse.

### Opción 2: Ejecutar los proyectos con npm

Instala las dependencias en cada aplicación:

```bash
cd backend
npm install
npm run dev
```

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend se sirve en el puerto `5173` y el backend utiliza el puerto definido en `PORT` o, en su defecto, el `3000`.

## Variables de entorno

No incluyas valores reales en el repositorio. Los archivos `.env` están ignorados por Git. El backend necesita:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_places
DB_USER=postgres
DB_PASSWORD=<tu-password>
OPENAI_API_KEY=<tu-api-key>
CLOUDINARY_CLOUD_NAME=<tu-cloud-name>
CLOUDINARY_API_KEY=<tu-api-key>
CLOUDINARY_API_SECRET=<tu-api-secret>
```

El frontend necesita:

```env
VITE_API_URL=http://localhost:3000
```

Para Docker Compose, el servicio backend sobreescribe `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` con los valores del servicio PostgreSQL local. Las credenciales de OpenAI y Cloudinary deben seguir disponibles mediante `backend/.env` o la configuración del entorno de ejecución.

## Base de datos PostgreSQL y Neon

El esquema se encuentra en `db/init.sql` y define la tabla `places`, con información textual, precio, booleanos de características, etiquetas (`TEXT[]`), coordenadas e imagen. El backend usa un pool de `pg` y configura SSL con `rejectUnauthorized: false`, por lo que puede conectarse a una base PostgreSQL gestionada como Neon usando sus datos en las variables `DB_*`.

El repositorio no contiene una configuración específica de Neon ni una cadena de conexión publicada: la conexión se configura por variables de entorno.

## API REST

La API está disponible bajo `/places`:

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/places` | Devuelve todos los lugares. |
| `POST` | `/places` | Crea un lugar. Acepta `multipart/form-data` y el campo opcional `image`. `tags` se envía como JSON. |
| `POST` | `/places/search` | Recibe `{ "query": "..." }`, aplica filtros generados por OpenAI y devuelve `{ places, summary }`. |
| `PUT` | `/places/:id` | Actualiza los datos de un lugar. Devuelve `404` si no existe. |
| `DELETE` | `/places/:id` | Elimina un lugar y devuelve el registro eliminado. Devuelve `404` si no existe. |

Las consultas SQL del controlador de búsqueda usan parámetros para los valores recibidos. Si la IA no genera ningún filtro, la búsqueda responde con una lista vacía.

## Integraciones externas

### OpenAI

`aiService.ts` convierte la consulta libre en filtros JSON a partir de los tipos y etiquetas permitidos, incluyendo algunos sinónimos en español. `summaryPrompt.ts` realiza una segunda llamada para producir un resumen de un máximo de dos frases.

### Cloudinary

El endpoint de creación recibe una imagen opcional con Multer, la envía mediante `upload_stream` a la carpeta `smart-places` y persiste en `image_url` la URL segura devuelta por Cloudinary.

### Leaflet

La pantalla principal usa React Leaflet para mostrar un mapa centrado inicialmente en España. Cada lugar con coordenadas se representa con un marcador y un popup con título, ciudad, provincia y tipo, usando teselas públicas de OpenStreetMap.

## Docker

`docker-compose.yml` orquesta tres servicios: `frontend`, `backend` y `db`. El backend espera a que PostgreSQL esté saludable mediante un `healthcheck`. Cada aplicación tiene su propio Dockerfile basado en Node 22 y ejecuta su script de desarrollo.

## Despliegue en Render

El backend incluye CORS configurado para `https://smart-places-frontend.onrender.com`, lo que refleja el dominio frontend previsto en Render. El repositorio no incluye `render.yaml` ni una configuración automatizada de despliegue, por lo que frontend y backend deben configurarse como servicios independientes en Render, con sus respectivos comandos, puertos y variables de entorno. La base de datos puede apuntar a PostgreSQL gestionado mediante los valores `DB_*`.

## Scripts disponibles

En `frontend/`:

- `npm run dev`: inicia Vite.
- `npm run build`: genera la compilación de producción.
- `npm run lint`: ejecuta ESLint.
- `npm run preview`: sirve la compilación generada.

En `backend/`:

- `npm run dev`: inicia el servidor con `tsx`.
- `npm test`: actualmente es un script placeholder que termina con error; `backend/test/test-openai.ts` es una prueba manual independiente de OpenAI.