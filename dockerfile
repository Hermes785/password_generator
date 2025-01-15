# Étape 1 : Construction de l'application
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

#  Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Création d'une image de production
FROM nginx:stable-alpine

# Copier les fichiers de construction depuis la première étape
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration Nginx (facultatif, selon vos besoins)
# COPY nginx.conf /etc/nginx/conf.d/default.conf


# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
