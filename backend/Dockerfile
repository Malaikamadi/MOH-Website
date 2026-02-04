FROM node:20-bullseye

WORKDIR /app

# Install system dependencies needed by Strapi (sharp/libvips)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1337
CMD ["npm", "run", "develop"]
