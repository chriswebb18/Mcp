FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build TypeScript code
RUN npm run build

# Build TypeSpec definitions
RUN npm run build:typespec

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]