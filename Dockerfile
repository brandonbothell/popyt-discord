FROM node:24

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN yarn

# Copy the app code
COPY . .

# Build the project
RUN yarn build

# Expose ports
EXPOSE 3001

# Run the application
CMD [ "node", "dist/start-manager.js" ]
