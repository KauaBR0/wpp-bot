# MongoDB Setup for Vercel Deployment

This document explains how to set up MongoDB for your WhatsApp bot when deploying to Vercel.

## Why MongoDB?

Vercel's serverless environment doesn't allow writing to the filesystem, which causes the error with the LocalAuth strategy that was previously used. By switching to MongoDB for session storage, we can maintain WhatsApp sessions across deployments without relying on local file storage.

## Setup Instructions

### 1. Create a MongoDB Atlas Account

If you don't already have one, create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).

### 2. Create a Cluster

- Create a new cluster (the free tier is sufficient)
- Configure your database access (create a user with password)
- Configure network access (allow access from anywhere for development purposes)

### 3. Get Your Connection String

- In your cluster, click "Connect"
- Select "Connect your application"
- Copy the connection string (it will look like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
- Replace `<password>` with your database user's password

### 4. Add the Connection String to Vercel

1. In your Vercel dashboard, go to your project
2. Navigate to "Settings" > "Environment Variables"
3. Add a new environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
4. Save the changes

### 5. Deploy Your Project

Deploy your project to Vercel using the Vercel CLI or GitHub integration.

```bash
vercel --prod
```

## Local Development

For local development, you can create a `.env` file in your project root with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Then install the `dotenv` package and add this to the top of your `main.js` file:

```javascript
require('dotenv').config();
```

## Troubleshooting

If you encounter connection issues:

1. Verify your MongoDB Atlas cluster is running
2. Check that your IP address is whitelisted in MongoDB Atlas Network Access
3. Ensure your username and password are correct in the connection string
4. Verify the environment variable is correctly set in Vercel