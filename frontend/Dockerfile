# Dockerfile para Frontend Vite/React

# 1. Imagem base
FROM node:18

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia package.json e package-lock.json
COPY package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia o restante do código
COPY . .

# 6. Expor porta do Vite
EXPOSE 5173

# 7. Comando para rodar o dev server
CMD ["npm", "run", "dev", "--", "--host"]
