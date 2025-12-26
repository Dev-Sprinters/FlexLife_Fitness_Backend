
# FlexLife Fitness Backend

RESTful backend for a workout planning and tracking mobile app, built with Node.js, Express, and MongoDB.

## Features
- User registration and login (JWT authentication)
- Browse reusable workout templates
- Schedule workouts for specific dates
- Track and complete planned workouts
- View workout history and statistics
- Full API documentation with Swagger (OpenAPI)

## Project Structure
```
src/
  controllers/    # Business logic for each feature
  middleware/     # Custom Express middleware (e.g., auth)
  models/         # Mongoose schemas for MongoDB
  routes/         # API route definitions
  utils/          # Utility functions (e.g., JWT generation, Swagger setup)
  index.js        # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd FlexLife_Fitness_Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/flexlife_fitness
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm run dev
   # or
   npm start
   ```

## API Documentation

Interactive API docs are available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Main Endpoints

#### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

#### Workouts
- `GET /api/workouts` — List all workout templates
- `GET /api/workouts/:id` — Get workout details (with exercises)

#### User Workouts
- `POST /api/user-workouts` — Schedule a workout for a date
- `GET /api/user-workouts/today` — Get today’s scheduled workout
- `GET /api/user-workouts/history` — Get all scheduled/completed workouts
- `POST /api/user-workouts/:id/complete` — Mark a workout as completed
- `GET /api/user-workouts/stats` — Get workout statistics

### Example API Request
```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "Alice",
  "email": "alice@email.com",
  "password": "secret"
}
```

### Authentication
- All user-specific endpoints require a JWT in the `Authorization` header:
  ```
  Authorization: Bearer <token>
  ```

## Code Style & Architecture
- **Controllers**: All business logic is in `src/controllers`.
- **Routes**: Only handle routing and call controllers.
- **Models**: Mongoose schemas in `src/models`.
- **Middleware**: For authentication, etc.
- **Utils**: For helpers like JWT token generation and Swagger setup.
- **Swagger**: All endpoints are documented with OpenAPI annotations in the route files.

## License
MIT
