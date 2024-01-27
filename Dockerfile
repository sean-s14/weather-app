# Use an official Node runtime as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Build the Vite project
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3000
