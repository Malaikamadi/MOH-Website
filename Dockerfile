FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Build Strapi
RUN npm run build

# Expose port
EXPOSE ${PORT:-1337}

# Start Strapi
CMD ["npm", "run", "start"]
