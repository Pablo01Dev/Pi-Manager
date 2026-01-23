# Usa a versão 'slim' que evita erros de dependências faltando (python, make, g++)
FROM node:18-slim

# Garante que as ferramentas básicas do sistema estejam instaladas
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Pasta do app
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências (agora com suporte a tudo)
RUN npm install

# Copia o código fonte
COPY . .

# Expõe a porta e inicia
EXPOSE 8080
CMD [ "node", "index.js" ]