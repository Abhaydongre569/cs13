# 🚀 Complete Deployment Guide - Error-Free Setup

## Project Structure
```
├── api/
│   └── index.js          (Express server - Main app)
├── public/
│   ├── index.html        (Frontend)
│   └── index.css         (Styling)
├── .env                  (Environment variables - KEEP SECRET)
├── .env.example          (Template for .env)
├── package.json          (Dependencies)
├── vercel.json          (Vercel deployment config)
└── index.js             (Entry point for local dev)
```

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create/Update `.env` file:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://abhaydongre398_db_user:ZkmxLQ1kz23I2Xf1@cluster13.yzdzfns.mongodb.net/abhi?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on http://localhost:5000

## Deployment to Vercel

### Prerequisites
- GitHub account with your repository pushed
- Vercel account (vercel.com)
- MongoDB Atlas account with connection string

### Step-by-Step Deployment

#### 1. Connect Git Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin master
```

#### 2. Deploy on Vercel
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Select the project root folder
- Click "Deploy"

#### 3. Add Environment Variables on Vercel
In Vercel Dashboard → Project Settings → Environment Variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://abhaydongre398_db_user:ZkmxLQ1kz23I2Xf1@cluster13.yzdzfns.mongodb.net/abhi?retryWrites=true&w=majority
FRONTEND_URL=https://yourdomain.vercel.app
```

#### 4. Trigger Deployment
- Vercel will automatically deploy after you push to GitHub
- OR manually redeploy from Vercel Dashboard

### Automatic Deployment
- Every `git push` to your GitHub repository will trigger automatic deployment on Vercel
- Builds happen in the cloud - no local build needed
- Deployment logs are available in Vercel Dashboard

## API Endpoints (Production)

- **GET** `/api/getcourse` - Get all courses
- **POST** `/api/addcourse` - Add new course
- **PUT** `/api/updatecourse/:id` - Update course
- **DELETE** `/api/deletecourse/:id` - Delete course

## Troubleshooting

### Build Fails
- Check Node version: Should be 24.x (specified in package.json)
- Check MONGODB_URI includes database name and parameters
- Ensure all required dependencies are in package.json

### MongoDB Connection Error
- Verify MONGODB_URI in .env
- Check MongoDB Atlas cluster is active
- Ensure IP address is whitelisted in MongoDB Atlas

### API Not Responding
- Check vercel.json routes configuration
- Ensure api/index.js exports the app correctly
- Verify environment variables are set on Vercel

### Frontend Not Loading
- Check public/index.html exists
- Verify API_BASE_URL in frontend code matches deployed URL
- Check public/index.css is properly linked

## Important Notes

✅ **Do This Before Deployment:**
1. Test locally with `npm run dev`
2. Push all changes to GitHub
3. Set environment variables on Vercel
4. Monitor deployment logs

❌ **Don't Do This:**
1. Commit .env file (it's in .gitignore)
2. Use hardcoded URLs in frontend
3. Use localhost in production environment variables
4. Share database credentials publicly

## Verification Checklist

- [x] Node server configured correctly
- [x] MongoDB connection uses environment variables
- [x] Static files served from public folder
- [x] All API routes prefixed with /api/
- [x] package.json has correct main entry
- [x] vercel.json routes configured
- [x] .env.example created for reference
- [x] .gitignore prevents secret files upload
- [x] CORS enabled for frontend
- [x] Error handling in all endpoints

## Quick Deploy Command

```bash
# Local test
npm run dev

# If working, push to GitHub
git add .
git commit -m "Deploy ready"
git push origin master

# Vercel auto-deploys! Check dashboard for status
```

## Support & Resources
- Vercel Docs: https://vercel.com/docs
- Express Docs: https://expressjs.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
