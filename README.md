
# LinkAlchemy - URL Shortener

A modern URL shortening service with analytics built with React and NestJS.

## Project Structure

This project is organized as a monorepo containing both frontend and backend code:

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript + PostgreSQL

## Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker and Docker Compose (for running the database and backend)

### Running the Backend

1. Start the PostgreSQL database and NestJS backend using Docker Compose:

```bash
docker-compose up
```

This will start both the database and backend services. The API will be available at http://localhost:3000.

### Running the Frontend

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

This will start the frontend development server at http://localhost:5173.

## Environment Variables

### Frontend (.env)

- `VITE_API_URL`: The URL of the backend API (default: http://localhost:3000)

### Backend (backend/.env)

- `NODE_ENV`: Development or production environment
- `DB_HOST`: PostgreSQL database host
- `DB_PORT`: PostgreSQL database port
- `DB_USERNAME`: PostgreSQL database username
- `DB_PASSWORD`: PostgreSQL database password
- `DB_NAME`: PostgreSQL database name
- `JWT_SECRET`: Secret key for JWT authentication
- `FRONTEND_URL`: URL of the frontend application for CORS

## Production Deployment

For production deployment, you will need to:

1. Build the frontend:

```bash
npm run build
```

2. Build and deploy the backend to a suitable hosting platform.
3. Set up a PostgreSQL database.
4. Configure the environment variables appropriately.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
