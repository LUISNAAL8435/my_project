FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Copia dependencias
COPY package.json package-lock.json ./

# Instala Angular CLI globalmente con la misma versión que tu proyecto
RUN npm install -g @angular/cli@19.2.18 \
    && npm install

# Copia el resto del proyecto
COPY . .

# Exponer puerto de Angular CLI
EXPOSE 4200

# Comando para desarrollo con HMR
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=2000", "--live-reload"]
