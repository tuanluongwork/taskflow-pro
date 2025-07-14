@echo off
echo Setting up TaskFlow Pro...
echo.

echo Creating environment file...
(
echo # Application
echo NODE_ENV=development
echo PORT=3000
echo.
echo # Database
echo DATABASE_HOST=localhost
echo DATABASE_PORT=5432
echo DATABASE_NAME=taskflow
echo DATABASE_USER=postgres
echo DATABASE_PASSWORD=postgres
echo.
echo # Redis
echo REDIS_HOST=localhost
echo REDIS_PORT=6379
echo.
echo # JWT
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
echo JWT_EXPIRES_IN=7d
echo.
echo # Frontend
echo FRONTEND_URL=http://localhost:3005
) > .env

echo.
echo Installing dependencies...
call npm install

echo.
echo Project setup complete!
echo.
echo To run the project:
echo 1. Make sure PostgreSQL and Redis are running
echo 2. Run: docker-compose up -d (for database and redis)
echo 3. Run: npm run dev (to start development servers)
echo.
pause