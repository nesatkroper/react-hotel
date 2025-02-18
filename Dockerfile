# Use the official Node.js image with the correct version
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
