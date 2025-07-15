# TaskFlow Pro - Enterprise Task Management System

## 🚀 Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **NestJS** - Enterprise-grade Node.js framework
- **GraphQL** with Apollo Server
- **REST API** with OpenAPI/Swagger documentation
- **PostgreSQL** with TypeORM
- **Redis** for caching and session management
- **OAuth2** authentication with JWT tokens
- **Docker** containerization
- **Microservices** architecture

### Frontend
- **React** with **TypeScript**
- **Apollo Client** for GraphQL
- **Material-UI** for component library
- **SCSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management

### DevOps & Cloud
- **Docker** & **Docker Compose**
- **GitHub Actions** for CI/CD
- **Jest** for unit testing
- **Cypress** for E2E testing
- **AWS/GCP** deployment ready
- **Kubernetes** configuration files

## 🏗️ Architecture

The application follows a microservices architecture with the following services:

1. **API Gateway** - Central entry point for all client requests
2. **Auth Service** - OAuth2 authentication and authorization
3. **Task Service** - Core task management functionality
4. **Notification Service** - Real-time notifications
5. **User Service** - User profile management

## 🔐 Features

- **OAuth2 Authentication** with Google and GitHub providers
- **JWT Token** based authorization
- **GraphQL API** with subscriptions for real-time updates
- **RESTful API** for legacy support
- **Role-based access control** (RBAC)
- **Real-time notifications** using WebSockets
- **File upload** capabilities
- **API rate limiting** and security headers
- **Comprehensive error handling** and logging
- **Database migrations** and seeding
- **API documentation** with Swagger
- **Health checks** and monitoring endpoints

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL
- Redis

### Installation

1. Clone the repository
```bash
git clone https://github.com/tuanluongwork/taskflow-pro.git
cd taskflow-pro
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Run with Docker Compose
```bash
docker-compose up -d
```

5. Run database migrations
```bash
npm run migration:run
```

6. Start the development server
```bash
npm run dev
```

## 📝 API Documentation

- GraphQL Playground: http://localhost:3000/graphql
- REST API Swagger: http://localhost:3000/api-docs

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

The project includes configurations for:
- Docker deployment
- Kubernetes deployment (k8s/ directory)
- GitHub Actions CI/CD pipeline
- AWS ECS/Fargate deployment scripts
- Google Cloud Run deployment

## 📊 Project Structure

```
taskflow-pro/
├── backend/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── task-service/
│   ├── notification-service/
│   └── user-service/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
├── shared/
│   └── types/
├── docker/
├── k8s/
├── .github/
│   └── workflows/
└── docs/
```
