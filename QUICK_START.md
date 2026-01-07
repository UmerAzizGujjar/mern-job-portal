# Quick Start Guide

## Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

Or for development mode with auto-reload:

```bash
cd backend
npm run dev
```

Backend will be running at: http://localhost:5000

## Step 2: Start the Frontend Application

Open another terminal and run:

```bash
cd frontend
npm start
```

Frontend will be running at: http://localhost:3000

## Step 3: Access the Application

Open your browser and navigate to: http://localhost:3000

## Test Accounts

You can create your own accounts, but here's how to test the application:

### Register as Job Seeker:
1. Click "Register"
2. Select "Job Seeker" role
3. Fill in your details
4. Submit the form
5. You'll be redirected to the Job Seeker dashboard

### Register as Employer:
1. Click "Register"
2. Select "Employer" role
3. Fill in your details including company information
4. Submit the form
5. You'll be redirected to the Employer dashboard

## Workflow Examples

### As an Employer:
1. Login/Register as Employer
2. Click "Post New Job"
3. Fill in job details
4. Submit the job posting
5. View your jobs in "Manage Jobs"
6. Wait for applications to come in
7. Review applications in the dashboard
8. Update application status (reviewed, shortlisted, accepted, rejected)

### As a Job Seeker:
1. Login/Register as Job Seeker
2. Browse jobs on the "Browse Jobs" page
3. Use filters to find relevant jobs
4. Click on a job to view details
5. Click "Apply Now"
6. Write a cover letter
7. Submit your application
8. Track your applications in "My Applications"
9. View status updates from employers

## MongoDB Connection

The application is configured to connect to MongoDB Atlas with the following credentials:
- Username: jobportal
- Password: admin123
- Cluster: cluster0.vqpqdli.mongodb.net

The database name is "jobportal" and it will automatically create the following collections:
- users
- jobs
- applications

## API Testing

If you want to test the API directly, you can use tools like Postman or curl:

### Example: Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "jobseeker",
    "phone": "1234567890"
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Backend won't start:
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use
- Run `npm install` in backend folder

### Frontend won't start:
- Ensure port 3000 is not in use
- Run `npm install` in frontend folder
- Check if backend is running

### Can't connect to MongoDB:
- Verify your internet connection
- Check MongoDB Atlas credentials
- Ensure your IP is whitelisted in MongoDB Atlas

### CORS errors:
- Ensure backend is running on port 5000
- Check proxy setting in frontend/package.json

## Features to Test

1. **User Authentication**
   - Register with both roles
   - Login/Logout
   - Protected routes

2. **Job Management (Employer)**
   - Create job
   - Edit job
   - Delete job
   - Close/Reopen job

3. **Job Browsing (Job Seeker)**
   - Search jobs
   - Filter by location, type, experience
   - View job details

4. **Application Process**
   - Apply to jobs
   - Withdraw applications
   - Track application status

5. **Application Management (Employer)**
   - View all applications
   - Filter by status
   - Update status
   - Add notes

## Important Notes

- The JWT secret in `.env` should be changed for production
- File upload for resumes is not yet implemented (uses URL links)
- Email notifications are not implemented
- This is a demo application for educational purposes
