import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rotas principais
app.use('/api', routes);

app.get('/', (req, res) => res.send('API Pi-Mananger funcionando 🚀'));

// --- MUDANÇA IMPORTANTE AQUI ---

// 1. Tenta conectar no banco (em segundo plano)
console.log("⏳ Tentando conectar ao MongoDB...");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

// 2. Liga o servidor IMEDIATAMENTE (não espera o banco)
const PORT = process.env.PORT || 8080; // Cloud Run usa 8080 por padrão
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});