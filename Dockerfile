                                                                                 
# Use official Node.js 14 image as base
FROM node:22

# Set working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]



