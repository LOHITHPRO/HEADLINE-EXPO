# Deployment Guide for Render

## Prerequisites
1. A Render account
2. Your NEWS_API_KEY from GNews.io
3. Git repository with your code

## Step-by-Step Deployment

### 1. Prepare Your Repository
Make sure your repository has the following structure:
```
HEADLINE-EXPO/
├── package.json (root)
├── server/
│   ├── package.json
│   └── index.js
└── client/
    ├── package.json
    └── src/
```

### 2. Deploy on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure the Service**
   - **Name**: `headline-expo` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repository)
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add the following environment variable:
   - **Key**: `NEWS_API_KEY`
   - **Value**: Your GNews.io API key

5. **Advanced Settings**
   - **Auto-Deploy**: Enabled
   - **Health Check Path**: `/`

### 3. Build and Deploy
- Click "Create Web Service"
- Render will automatically:
  1. Install dependencies
  2. Build the React app
  3. Start the server
  4. Deploy your application

### 4. Access Your App
- Once deployment is complete, you'll get a URL like: `https://your-app-name.onrender.com`
- Your app should be fully functional with both frontend and API

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all package.json files have correct scripts
   - Ensure Node.js version is specified (>=18.0.0)

2. **API Key Issues**
   - Verify NEWS_API_KEY is set in environment variables
   - Check that the API key is valid and has sufficient credits

3. **CORS Issues**
   - The server is configured to handle CORS properly
   - Frontend and backend are served from the same domain

4. **Static Files Not Loading**
   - Ensure the build directory exists
   - Check that express.static is configured correctly

### Debug Commands:
- Check build logs in Render dashboard
- Verify environment variables are set correctly
- Test API endpoint: `https://your-app-name.onrender.com/api/news?lang=en&country=us`

## Local Development
To run locally:
```bash
npm run install-all
npm run dev
```

This will start both server (port 5000) and client (port 3000) concurrently. 