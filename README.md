# 🚀 MERN Stack Job Portal

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=JSON%20web%20tokens)

A comprehensive, full-stack job portal application connecting employers with talented job seekers.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

A professional job portal web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a complete hiring workflow solution with secure authentication, role-based access control, and comprehensive job management features.

### Built For
- ✅ Internship/Academic Projects
- ✅ Portfolio Demonstrations
- ✅ Learning MERN Stack Development
- ✅ Foundation for Production Systems

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with secure token management
- Password hashing using bcryptjs
- Protected routes with role-based access control
- Automatic token refresh handling

### 👤 Dual User Roles

#### For Job Seekers:
- 📝 Browse and search jobs with advanced filters
- 🔍 Filter by location, job type, and experience level
- 📄 Apply to jobs with custom cover letters
- 📊 Track application status in real-time
- 📈 Personal dashboard with application statistics
- ⚡ Withdraw applications
- 💼 Manage profile with skills and experience

#### For Employers:
- ➕ Post new job openings with detailed descriptions
- ✏️ Edit and update existing job postings
- 🗑️ Delete job listings
- 👁️ View all applications for each job
- 🔄 Update application status (pending → reviewed → shortlisted → accepted/rejected)
- 📝 Add private notes to applications
- 📊 Dashboard with hiring analytics
- 🔒 Close/reopen job postings

### 🎨 User Interface
- Responsive design for all devices
- Modern, clean interface
- Color-coded status badges
- Interactive dashboards
- Real-time updates
- User-friendly forms

### 🗄️ Database
- MongoDB Atlas integration
- Proper collection relationships
- Indexed queries for performance
- Data validation

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/UmerAzizGujjar/mern-job-portal.git
cd mern-job-portal
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with MongoDB Atlas credentials:
```env
PORT=5000
MONGODB_URI=mongodb+srv://jobportal:admin123@cluster0.vqpqdli.mongodb.net/jobportal?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

---

## 🚂 Deployment to Railway

### Backend Deployment

This project includes a `railway.toml` file that tells Railway where the backend folder is located.

#### Option 1: Using railway.toml (Recommended)
The `railway.toml` file is already configured:
```toml
[build]
builder = "NIXPACKS"
buildCommand = "cd backend && npm install"

[deploy]
startCommand = "cd backend && npm start"
```

#### Option 2: Railway Dashboard Settings
Alternatively, you can configure in Railway dashboard:
1. Go to your Railway project
2. Click on **Settings**
3. Set **Root Directory** to `backend`
4. Set **Start Command** to `npm start`

#### Environment Variables for Railway
Add these in Railway dashboard:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

### Frontend Deployment (Vercel/Netlify)
Deploy frontend separately to Vercel or Netlify:
1. Connect your GitHub repository
2. Set **Root Directory** to `frontend`
3. Set **Build Command** to `npm run build`
4. Set **Output Directory** to `build`
5. Add environment variable: `REACT_APP_API_URL=your_railway_backend_url`

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Usage

### Getting Started

1. **Start Backend Server** (Terminal 1):
```bash
cd backend
npm start
```

2. **Start Frontend** (Terminal 2):
```bash
cd frontend
npm start
```

3. **Open Browser**: Navigate to `http://localhost:3000`

### User Workflows

#### As a Job Seeker:
1. Register with "Job Seeker" role
2. Browse available jobs
3. Use filters to find relevant positions
4. Click on a job to view details
5. Apply with a cover letter
6. Track applications in dashboard
7. View status updates from employers

#### As an Employer:
1. Register with "Employer" role + company details
2. Post new job openings
3. Manage posted jobs (edit/delete/close)
4. View applications for each job
5. Review candidate details
6. Update application status
7. Add notes to applications

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Job Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/jobs` | Get all jobs (with filters) | Public |
| GET | `/api/jobs/:id` | Get single job | Public |
| POST | `/api/jobs` | Create job | Employer |
| PUT | `/api/jobs/:id` | Update job | Employer |
| DELETE | `/api/jobs/:id` | Delete job | Employer |
| GET | `/api/jobs/employer/my-jobs` | Get employer's jobs | Employer |

### Application Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/applications` | Submit application | Job Seeker |
| GET | `/api/applications/my-applications` | Get user applications | Job Seeker |
| GET | `/api/applications/job/:jobId` | Get job applications | Employer |
| GET | `/api/applications/employer/all` | Get all employer apps | Employer |
| PUT | `/api/applications/:id` | Update application status | Employer |
| GET | `/api/applications/:id` | Get single application | Private |
| DELETE | `/api/applications/:id` | Withdraw application | Job Seeker |

### Request Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker",
  "phone": "1234567890"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Create Job (Employer)
```bash
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "description": "Looking for experienced React developer...",
  "company": "Tech Corp",
  "location": "New York, NY",
  "jobType": "full-time",
  "experienceLevel": "senior",
  "salary": { "min": 80000, "max": 120000, "currency": "USD" },
  "skills": ["React", "Node.js", "MongoDB"],
  "requirements": ["5+ years experience", "Bachelor's degree"],
  "status": "active"
}
```

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (jobseeker/employer),
  phone: String,
  // Job Seeker fields
  resume: String,
  skills: [String],
  experience: String,
  education: String,
  // Employer fields
  companyName: String,
  companyDescription: String,
  website: String,
  createdAt: Date
}
```

### Jobs Collection
```javascript
{
  title: String,
  description: String,
  company: String,
  location: String,
  salary: { min: Number, max: Number, currency: String },
  jobType: String (full-time/part-time/contract/internship/remote),
  experienceLevel: String (entry/intermediate/senior/executive),
  skills: [String],
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  employerId: ObjectId (ref: User),
  status: String (active/closed/draft),
  applicationDeadline: Date,
  applicationsCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  jobId: ObjectId (ref: Job),
  jobSeekerId: ObjectId (ref: User),
  employerId: ObjectId (ref: User),
  coverLetter: String,
  resume: String,
  status: String (pending/reviewed/shortlisted/rejected/accepted),
  notes: String,
  appliedAt: Date,
  updatedAt: Date
}
```

---

## 📁 Project Structure

```
mern-job-portal/
├── backend/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── applications.js
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── utils/
│   │   └── jwtUtils.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── ApplicationDetails.js
│   │   │   ├── EmployerDashboard.js
│   │   │   ├── Home.js
│   │   │   ├── JobApplications.js
│   │   │   ├── JobDetails.js
│   │   │   ├── Jobs.js
│   │   │   ├── JobSeekerDashboard.js
│   │   │   ├── Login.js
│   │   │   ├── ManageJobs.js
│   │   │   ├── MyApplications.js
│   │   │   ├── PostJob.js
│   │   │   └── Register.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Role-based authorization
- ✅ Input validation with express-validator
- ✅ MongoDB injection prevention
- ✅ CORS configuration
- ✅ Environment variable protection

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is created for educational purposes.

---

## 👨‍💻 Author

**Umer Aziz Gujjar**
- GitHub: [@UmerAzizGujjar](https://github.com/UmerAzizGujjar)
- Repository: [mern-job-portal](https://github.com/UmerAzizGujjar/mern-job-portal)

---

## 🙏 Acknowledgments

- MERN Stack Community
- MongoDB Atlas
- React Documentation
- Express.js Documentation

---

## 📞 Support

For support, issues, or feature requests, please open an issue in the GitHub repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ using MERN Stack

</div>
