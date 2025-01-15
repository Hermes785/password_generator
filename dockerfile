# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npmW build

# Étape 2 : Image finale pour exécuter l'application
FROM node:18-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./


