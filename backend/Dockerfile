# Usa uma versão leve do Node
FROM node:18-alpine

# Cria a pasta do app dentro do servidor
WORKDIR /usr/src/app

# Copia os arquivos de configuração (package.json)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia todo o resto do seu código para dentro da pasta
COPY . .

# Expõe a porta que o Google Cloud espera (padrão)
EXPOSE 8080

# Comando para iniciar o seu servidor
CMD [ "npm", "start" ]