# Escolher a imagem base do Node.js
FROM node:18

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e o package-lock.json para dentro do container
COPY package*.json ./

# Instalar dependências do projeto
RUN npm install --legacy-peer-deps

# Copiar o restante do código para o container
COPY . .

# Expor a porta que a aplicação vai rodar (ajuste conforme necessário)
EXPOSE 3000

# Comando para rodar o servidor (ajuste conforme necessário)
CMD ["npm", "start"]
