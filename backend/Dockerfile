FROM node:20-alpine

WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm install

# Copie du reste du code
COPY . .

# Génération du client Prisma
RUN DATABASE_URL="postgresql://user:password@localhost:5432/db" npx prisma generate

# Build du projet TypeScript
RUN npm run build

# Exposition du port
EXPOSE 3000

# Commande de démarrage (on utilise un script shell pour gérer les migrations au lancement)
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
