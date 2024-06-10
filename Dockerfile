FROM node:20

# Create and change to the app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["npm", "run", "dev:docker"]