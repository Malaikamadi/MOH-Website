FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy source
COPY . ./

# Build Strapi
RUN npm run build

# Expose port
EXPOSE ${PORT:-1337}

# Start Strapi
CMD ["npm", "run", "start"]
