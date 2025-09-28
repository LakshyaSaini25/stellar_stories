# Stellar Stories: Space Weather Through the Eyes of Earthlings

## 📚 Table of Contents

-   [Introduction](#introduction)
-   [Challenge Details](#challenge-details)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Installation & Setup](#installation--setup)
-   [Environment Configuration](#environment-configuration)
-   [API Integration](#api-integration)
-   [Development Guide](#development-guide)
-   [Deployment](#deployment)
-   [Troubleshooting](#troubleshooting)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)
-   [Support](#support)
-   [Changelog](#changelog)

## 🚀 Introduction

**Stellar Stories** is an interactive educational platform developed for the 2025 NASA Space Apps Challenge. The project creates digital children's stories that explain space weather and its impacts on Earth in an engaging, easy-to-understand way. Through 3D visualizations, AI-powered storytelling, and interactive modules, children learn about solar flares, coronal mass ejections, auroras, and how space weather affects daily life.

### Key Objectives

-   Create compelling digital stories about space weather for children
-   Use 3D models to visualize Earth, Sun, and solar system concepts
-   Provide AI-assisted learning experiences
-   Make complex space science accessible and fun
-   Educate about real-world impacts of space weather on technology and society

## 🛰️ Challenge Details

This project is developed for the **2025 NASA Space Apps Challenge** under the theme "Stellar Stories: Space Weather Through the Eyes of Earthlings". The challenge requires creating a digital children's story that explains space weather and its varying impacts on different communities.

### Challenge Requirements
- **Theme**: Space Weather Education for Children
- **Format**: Digital interactive story with illustrations
- **Perspective**: Can be from a person impacted by space weather or from a solar flare/CME
- **Content**: Definition of space weather, examples of impacts, character development
- **Target Audience**: Elementary, middle, or high school students

### Our Approach
We tell the story through the eyes of various Earthlings (farmers, pilots, astronauts, etc.) and space phenomena themselves, using:
- 3D models of Earth, Sun, and solar system
- Interactive storytelling modules
- AI-powered educational chat
- Real-time space weather data visualization
- Engaging animations and illustrations

## ✨ Features

### 🌟 Core Functionality

-   **Interactive Space Stories**: Digital children's stories about space weather phenomena
-   **3D Solar System Visualization**: Immersive 3D models of Earth, Sun, and space weather events
-   **AI-Powered Learning Assistant**: Gemini AI chat for answering questions about space weather
-   **Multiple Perspectives**: Stories told from viewpoints of affected people and space phenomena
-   **Real-time Data Integration**: Live space weather monitoring and alerts

### 🎨 User Experience

-   **Child-Friendly Interface**: Colorful, engaging design optimized for young learners
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-   **Interactive Animations**: Engaging animations and transitions for better learning
-   **Audio Narration**: Text-to-speech functionality for accessibility
-   **Progress Tracking**: Learning milestones and achievement system

### 🔧 Technical Features

-   **3D Rendering**: Three.js integration for solar system and space weather visualization
-   **AI Integration**: Google Gemini and OpenAI APIs for intelligent tutoring
-   **Real-time Updates**: Live space weather data from NASA APIs
-   **Authentication**: Firebase authentication with email verification
-   **Database**: MongoDB backend for user progress and content storage

## 🛠 Tech Stack

### Frontend Framework

-   **React 18** - Modern React with hooks and functional components
-   **TypeScript** - Type-safe development with full type coverage
-   **Vite** - Fast build tool and development server
-   **Bun** - Fast JavaScript runtime and package manager

### AI & APIs

-   **Google Gemini AI** - Advanced language model for educational chat
-   **OpenAI API** - Additional AI capabilities for tutoring
-   **Firebase Auth** - User authentication and email verification

### 3D & Visualization

-   **Three.js** - 3D graphics library for solar system visualization
-   **React Three Fiber** - React renderer for Three.js
-   **React Three Drei** - Useful helpers for React Three Fiber

### Styling & UI

-   **Tailwind CSS** - Utility-first CSS framework
-   **shadcn/ui** - Modern UI components built on Radix UI
-   **Framer Motion** - Animation library for smooth transitions
-   **Lucide React** - Beautiful icon library

### Backend

-   **FastAPI** - Modern Python web framework
-   **MongoDB** - NoSQL database with Beanie ODM
-   **Motor** - Async MongoDB driver
-   **JWT** - JSON Web Token authentication

### Development Tools

-   **ESLint** - Code linting and quality assurance
-   **TypeScript** - Type checking and compilation
-   **Git** - Version control

## 📁 Project Structure

    stellar_stories/
    ├── stellar_stories-frontend/ # React Frontend
    │   ├── public/ # Static assets
    │   │   ├── background.gif # Animated space background
    │   │   ├── favicon.ico # App favicon
    │   │   ├── Standing_Idle.fbx # 3D avatar model
    │   │   ├── Talking.fbx # 3D avatar talking animation
    │   │   └── background2_files/ # Additional assets
    │   ├── src/
    │   │   ├── components/ # React components
    │   │   │   ├── ui/ # shadcn/ui components (accordion, button, etc.)
    │   │   │   ├── auth/ # Authentication components
    │   │   │   ├── interview/ # Interview platform components
    │   │   │   ├── CourseAvatar.tsx # 3D avatar component
    │   │   │   ├── FloatingGeminiChat.tsx # AI chat widget
    │   │   │   └── CourseGeminiChat.tsx # Course-specific AI chat
    │   │   ├── hooks/ # Custom React hooks
    │   │   ├── lib/ # Utility libraries
    │   │   │   ├── api.ts # Backend API client
    │   │   │   ├── gemini.ts # Gemini AI integration
    │   │   │   └── utils.ts # General utilities
    │   │   ├── pages/ # Page components
    │   │   │   ├── Dashboard.tsx # Main dashboard with space stories
    │   │   │   ├── StoryPage.tsx # Individual story pages
    │   │   │   ├── Courses.tsx # Course listing
    │   │   │   ├── Course.tsx # Course content
    │   │   │   ├── ATSChecker.tsx # Resume ATS checker
    │   │   │   ├── SkillGapAnalyzer.tsx # Skill analysis tool
    │   │   │   └── InterviewPlatform.tsx # Mock interview platform
    │   │   ├── App.tsx # Main app component
    │   │   ├── main.tsx # App entry point
    │   │   └── index.css # Global styles
    │   ├── package.json # Frontend dependencies
    │   ├── vite.config.ts # Vite configuration
    │   ├── tailwind.config.ts # Tailwind CSS config
    │   └── README.md # Frontend documentation
    │
    ├── stellar_stories-backend/ # FastAPI Backend
    │   ├── app/
    │   │   ├── main.py # FastAPI application
    │   │   ├── config.py # Configuration settings
    │   │   ├── database.py # MongoDB connection
    │   │   ├── models/ # Pydantic models
    │   │   │   ├── user.py # User model
    │   │   │   ├── course.py # Course model
    │   │   │   └── ai_interaction.py # AI interaction model
    │   │   ├── routers/ # API routers
    │   │   │   ├── user.py # User endpoints
    │   │   │   ├── course.py # Course endpoints
    │   │   │   └── ai.py # AI interaction endpoints
    │   │   ├── crud/ # Database operations
    │   │   ├── schemas/ # API schemas
    │   │   └── __init__.py
    │   ├── requirements.txt # Python dependencies
    │   ├── Readme.md # Backend documentation
    │   └── .gitignore
    │
    ├── .env.example # Environment variables template
    └── README.md # Main project documentation

## ⚙️ Installation & Setup

### Prerequisites

-   **Node.js** (version 18 or higher)
-   **Bun** (recommended) or **npm**
-   **Python 3.8+** (for backend)
-   **MongoDB** (local or cloud instance)
-   **Google Cloud Account** with Gemini API access
-   **Firebase Project** for authentication

### Step-by-Step Installation

1.  **Clone the Repository**

    ``` bash
    git clone https://github.com/your-username/stellar_stories.git
    cd stellar_stories
    ```

2.  **Setup Backend**

    ``` bash
    cd stellar_stories-backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

3.  **Setup Frontend**

    ``` bash
    cd ../stellar_stories-frontend
    bun install  # or npm install
    ```

4.  **Environment Configuration**

    ``` bash
    cp .env.example .env
    # Edit .env with your API keys and configuration
    ```

5.  **Start Backend Server**

    ``` bash
    cd ../stellar_stories-backend
    source venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

6.  **Start Frontend Development Server**

    ``` bash
    cd ../stellar_stories-frontend
    bun run dev  # or npm run dev
    ```

7.  **Access Application** Open <http://localhost:5173> in your browser

## 🔐 Environment Configuration

Create a `.env` file in the `stellar_stories-frontend` directory:

``` env
# AI API Keys
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Backend API
VITE_API_BASE_URL=http://localhost:8000

# Application Settings
VITE_APP_TITLE="Stellar Stories"
VITE_APP_VERSION=1.0.0
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

For the backend, create a `.env` file in `stellar_stories-backend`:

``` env
# Database
MONGODB_URL=mongodb://localhost:27017/stellar_stories
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/stellar_stories

# JWT
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Optional: Additional API keys if needed
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔌 API Integration

### Gemini AI Service

``` typescript
import { callGeminiAPI } from '@/lib/gemini';

const response = await callGeminiAPI({
  message: userMessage,
  context: courseContext,
  history: recentMessages
});
```

### Backend API Client

``` typescript
import api from '@/lib/api';

// User authentication
const user = await api.get('/users/profile');

// Course data
const courses = await api.get('/courses');

// AI interactions
const aiResponse = await api.post('/ai/chat', {
  message: userMessage,
  context: 'space_weather_education'
});
```

### API Features

-   **Authentication**: JWT-based user authentication
-   **Real-time AI Chat**: Gemini and OpenAI integration
-   **Course Management**: CRUD operations for educational content
-   **Progress Tracking**: User learning analytics
-   **File Upload**: Resume and document processing for ATS
-   **Error Handling**: Comprehensive error management
-   **Rate Limiting**: API request throttling

## 🛠 Development Guide

### Code Standards

-   Use **TypeScript** for type safety
-   Follow **React functional components** with hooks
-   Use **Tailwind CSS** for styling
-   Implement **shadcn/ui** components for consistency
-   Follow **ESLint** rules for code quality

### Available Scripts

``` json
{
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### Development Workflow

1. **Start development servers** (backend and frontend)
2. **Make changes** to components or API endpoints
3. **Test features** in the browser
4. **Run linting** to check code quality
5. **Build for production** when ready to deploy

## 🚀 Deployment

### Frontend Deployment

1. **Build the application**

    ``` bash
    cd stellar_stories-frontend
    bun run build  # or npm run build
    ```

2. **Deploy to Vercel** (Recommended)

    ``` bash
    # Install Vercel CLI
    bun add -g vercel
    
    # Deploy
    vercel --prod
    ```

3. **Alternative Platforms**

    - **Netlify**: Drag and drop the `dist` folder or connect GitHub
    - **Vercel**: Automatic deployments from GitHub
    - **GitHub Pages**: For static hosting

### Backend Deployment

1. **Build and Deploy**

    ``` bash
    cd stellar_stories-backend
    
    # For Render/Heroku
    # Create requirements.txt (already exists)
    # Set environment variables in platform dashboard
    
    # For Docker (optional)
    docker build -t stellar-stories-backend .
    docker run -p 8000:8000 stellar-stories-backend
    ```

2. **Deployment Platforms**

    - **Render** (Recommended): Free tier available
    - **Heroku**: Easy Python deployment
    - **Railway**: Modern alternative
    - **DigitalOcean App Platform**: Scalable solution

### Database Setup

- **MongoDB Atlas** (Recommended): Cloud-hosted MongoDB
- **Local MongoDB**: For development
- **Railway/DigitalOcean**: Managed database services

### Full Stack Deployment

1. Deploy backend to Render/Heroku
2. Update `VITE_API_BASE_URL` in frontend environment variables
3. Deploy frontend to Vercel/Netlify
4. Configure CORS in backend for production domain

## 🔧 Troubleshooting

### Frontend Issues

**Build fails with TypeScript errors**
``` bash
cd stellar_stories-frontend
bun run lint  # Check for linting errors
bun run build:dev  # Build in development mode for better error messages
```

**3D models not loading**
- Check that FBX files are in `public/` directory
- Ensure Three.js dependencies are installed
- Check browser console for WebGL errors

**AI chat not working**
``` bash
# Check API keys
echo $VITE_GEMINI_API_KEY
echo $VITE_OPENAI_API_KEY

# Test API connectivity
curl "https://generativelanguage.googleapis.com/v1/models?key=$VITE_GEMINI_API_KEY"
```

### Backend Issues

**Database connection fails**
``` bash
cd stellar_stories-backend
# Check MongoDB connection
python -c "from app.database import connect_to_mongo; connect_to_mongo()"
```

**API endpoints not responding**
``` bash
# Check if backend is running
curl http://localhost:8000/health

# Check logs for errors
# In development, check terminal output
```

**CORS errors**
- Ensure `VITE_API_BASE_URL` matches backend URL
- Check CORS settings in `main.py`

### Development Server Issues

**Port conflicts**
``` bash
# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

**Firebase authentication issues**
- Verify Firebase config in `.env`
- Check Firebase console for correct API keys
- Ensure domain is whitelisted in Firebase

### Performance Issues

**Slow 3D rendering**
- Check browser WebGL support
- Reduce model complexity if needed
- Enable hardware acceleration in browser settings

**Large bundle size**
``` bash
bun run build
# Check dist/assets folder size
# Consider code splitting for large components
```

## 🤝 Contributing

### Development Workflow

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

### Code Style

- Follow the existing TypeScript and React patterns
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA Space Apps Challenge** for the inspiration and challenge theme
- **Google Gemini AI** for powering intelligent educational interactions
- **OpenAI** for additional AI capabilities
- **React & TypeScript** communities for excellent developer tools
- **Three.js** for 3D visualization capabilities
- **shadcn/ui** for beautiful UI components
- **Firebase** for authentication services

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Join our Discord community (link coming soon)
- Email: stellar.stories.edu@gmail.com

## 🔄 Changelog

### Version 1.0.0 (Current)

-   Initial release for NASA Space Apps Challenge 2025
-   Interactive 3D space weather stories
-   AI-powered educational chat assistant
-   Multiple story perspectives (Earthlings and space phenomena)
-   Real-time space weather data integration
-   Responsive design for all devices

### Planned Features

-   Additional story modules and perspectives
-   Multi-language support for global accessibility
-   Advanced 3D visualizations and animations
-   Collaborative storytelling features
-   Integration with NASA live data feeds
-   Mobile app companion
