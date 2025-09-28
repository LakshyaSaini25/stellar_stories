
# Stellar Stories Backend API

## Overview

The backend API for Stellar Stories, built with FastAPI and MongoDB. This API powers the educational platform for the NASA Space Apps Challenge 2025, providing endpoints for user management, course content, AI interactions, and progress tracking.

## Features

- **User Authentication**: JWT-based authentication with email verification
- **Course Management**: CRUD operations for educational content
- **AI Integration**: Endpoints for AI-powered educational interactions
- **Progress Tracking**: User learning analytics and milestone tracking
- **File Upload**: Support for document processing (ATS checker, etc.)
- **MongoDB Integration**: NoSQL database with Beanie ODM

## Tech Stack

- **FastAPI**: Modern Python web framework
- **MongoDB**: NoSQL database
- **Motor**: Async MongoDB driver
- **Beanie**: MongoDB ODM for Python
- **JWT**: JSON Web Token authentication
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server

## Installation

### Prerequisites

- Python 3.8+
- MongoDB (local or Atlas)

### Setup

1. **Clone and navigate to backend directory**
   ```bash
   cd stellar_stories-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   Create a `.env` file:
   ```env
   MONGODB_URL=mongodb://localhost:27017/stellar_stories
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Start MongoDB** (if using local instance)
   ```bash
   mongod  # Or use brew services start mongodb/brew/mongodb-community
   ```

6. **Run the server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

### Key Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /users/profile` - Get user profile
- `GET /courses` - List courses
- `POST /courses` - Create course
- `POST /ai/chat` - AI chat interaction

## Project Structure

```
stellar_stories-backend/
├── app/
│   ├── main.py          # FastAPI application
│   ├── config.py        # Configuration settings
│   ├── database.py      # MongoDB connection
│   ├── models/          # Pydantic models
│   │   ├── user.py      # User model
│   │   ├── course.py    # Course model
│   │   └── ai_interaction.py  # AI interaction model
│   ├── routers/         # API routers
│   │   ├── user.py      # User endpoints
│   │   ├── course.py    # Course endpoints
│   │   └── ai.py        # AI interaction endpoints
│   ├── crud/            # Database operations
│   ├── schemas/         # API schemas
│   └── __init__.py
├── requirements.txt     # Python dependencies
├── Readme.md           # This file
└── .gitignore
```

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black .
isort .
```

### API Testing

Use the built-in Swagger UI at `/docs` or tools like Postman/Insomnia.

## Deployment

### Docker (Optional)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Platforms

- **Render** (Recommended): Free tier available
- **Heroku**: Easy Python deployment
- **Railway**: Modern alternative
- **DigitalOcean App Platform**: Scalable solution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
