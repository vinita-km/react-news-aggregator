# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
