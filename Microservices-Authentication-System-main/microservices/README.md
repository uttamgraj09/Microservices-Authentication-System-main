# Microservices Authentication System

This project implements an authentication system using a microservices architecture with FastAPI and PostgreSQL.

## Services

1. **Auth Service** (Port 8000)
   - User registration
   - User login
   - User information retrieval

2. **Forgot Password Service** (Port 8001)
   - Request password reset
   - Verify reset token
   - Reset password

3. **Update Password Service** (Port 8002)
   - Update password for authenticated users

4. **Frontend**
   - Simple HTML/CSS/JavaScript frontend for the authentication system

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Python 3.8+
- PostgreSQL

### Running with Docker

1. Clone the repository
2. Run the services with Docker Compose:

```bash
docker-compose up -d
```

3. Access the application at: http://localhost

### Running Locally

1. Clone the repository
2. Create a PostgreSQL database named `auth_microservices_db`
3. Run each service in a separate terminal:

```bash
# Run auth-service
cd auth-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

```bash
# Run forgot-password-service
cd forgot-password-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

```bash
# Run update-password-service
cd update-password-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

4. Serve the frontend:

```bash
cd frontend
python server.py
```

5. Access the application at: http://localhost:8080

## API Documentation

- Auth Service: http://localhost:8000/docs
- Forgot Password Service: http://localhost:8001/docs
- Update Password Service: http://localhost:8002/docs

## Project Structure

```
.
├── auth-service/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── schemas.py
├── forgot-password-service/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── schemas.py
├── update-password-service/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── schemas.py
├── common/
│   ├── __init__.py
│   ├── database.py
│   └── models.py
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── script.js
│   ├── server.py
│   └── styles.css
├── docker-compose.yml
└── README.md
``` 