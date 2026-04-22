# CRUD App Deployment Guide - Vercel

## Project Structure
```
.
├── api/
│   └── index.js          # Express API (serverless functions)
├── public/
│   ├── index.html        # Frontend
│   └── index.css         # Styles
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── .env.example          # Environment variables template
└── .env                  # Your actual environment variables
```

## Deployment Steps

### 1. Prepare Your MongoDB Connection String
- Create a MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/abhi`

### 2. Create `.env` File
Copy `.env.example` to `.env` and add your MongoDB URI:
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/abhi
NODE_ENV=production
```

### 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 4. Deploy on Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Add Environment Variables:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string
5. Click "Deploy"

### 5. Test Your Application
- Frontend will be available at: `https://your-project.vercel.app`
- API endpoints:
  - GET: `/api/getcourse`
  - POST: `/api/addcourse`
  - PUT: `/api/updatecourse/:id`
  - DELETE: `/api/deletecourse/:id`

## Local Development
```bash
npm install
npm run dev
```
Server runs on http://localhost:5000

## Important Notes
- MongoDB URI must be set in Vercel environment variables
- Use MongoDB Atlas for cloud hosting (MongoDB localhost won't work on Vercel)
- Ensure your IP is whitelisted in MongoDB Atlas (or allow 0.0.0.0)
- Static files are served from `/public` folder
- API routes are under `/api/` prefix
