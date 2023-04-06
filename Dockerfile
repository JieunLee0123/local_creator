# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for both backend and frontend
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies for backend and frontend
RUN cd backend && npm ci
RUN cd frontend && npm ci

# Copy the rest of the application code
COPY backend ./backend
COPY frontend ./frontend

# Build the Vue.js frontend app into the Express public folder
RUN cd frontend && npm run build

# Expose the Express server port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the Express server
CMD ["node", "backend/bin/www"]