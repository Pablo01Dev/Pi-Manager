import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';

dotenv.config();

const app = express();

// 👇 ALTERAÇÃO AQUI: Liberando geral para acabar com o erro de CORS nos testes
app.use(cors());
// -----------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rotas principais
app.use('/api', routes);

app.get('/', (req, res) => res.send('API Pi-Mananger funcionando 🚀'));

// Conexão com o MongoDB
if (process.env.MONGO_URI) {
    console.log("⏳ Tentando conectar ao MongoDB...");
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB conectado com sucesso!'))
        .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));
} else {
    console.error('❌ Erro: Variável de ambiente MONGO_URI não definida!');
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

