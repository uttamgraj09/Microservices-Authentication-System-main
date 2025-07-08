# Microservices-Authentication-System
# Microservices Authentication System

A secure, scalable authentication system built using microservices architecture with FastAPI and PostgreSQL.

## Project Overview

This project implements a microservices-based authentication system with three main services:
- Authentication Service (Port 8000)
- Forgot Password Service (Port 8001)
- Update Password Service (Port 8002)

## Features

- User Registration
- User Login
- Password Reset Flow
- Token-based Authentication
- Secure Password Hashing
- Email Validation
- CORS Protection
- Input Validation

## Architecture

```
├── auth-service/           # Authentication service
├── forgot-password-service/# Password reset service
├── update-password-service/# Password update service
├── frontend/              # Frontend interface
└── docker-compose.yml     # Docker configuration
```

## Prerequisites

- Docker
- Docker Compose
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/microservices-auth.git
cd microservices-auth
```

2. Start the services:
```bash
docker-compose up -d
```

## Accessing the Services

- Frontend: http://localhost:8080
- Auth Service API: http://localhost:8000/docs
- Forgot Password Service API: http://localhost:8001/docs
- Update Password Service API: http://localhost:8002/docs

## Database Access

Connect to PostgreSQL:
```bash
docker-compose exec postgres psql -U postgres -d auth_microservices_db
```

Database credentials:
- Host: localhost
- Port: 5433
- Username: postgres
- Password: postgres
- Database: auth_microservices_db

## Service Management

Start all services:
```bash
docker-compose up -d
```

Stop all services:
```bash
docker-compose down
```

Check service status:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs [service-name]
```

## API Documentation

Each service provides its own Swagger documentation at:
- Auth Service: http://localhost:8000/docs
- Forgot Password Service: http://localhost:8001/docs
- Update Password Service: http://localhost:8002/docs

## Security Features

- Password hashing using bcrypt
- JWT tokens for authentication
- Secure password reset tokens
- CORS protection
- Input validation
- Environment variable configuration

## Development

To modify and rebuild a specific service:
```bash
docker-compose up -d --build [service-name]
```

## Testing

1. Access the frontend at http://localhost:8080
2. Test the registration flow
3. Test the login flow
4. Test the password reset flow
5. Verify database entries

## Troubleshooting

Common issues and solutions:
1. Service not starting: Check logs with `docker-compose logs [service-name]`
2. Database connection issues: Verify PostgreSQL is running
3. CORS errors: Check service configurations
4. API not accessible: Verify service ports and Docker networking

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FastAPI
- PostgreSQL
- Docker
- Python
