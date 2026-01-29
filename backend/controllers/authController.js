import User from '../models/User.js';
import AccessLog from '../models/AccessLog.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// IMPORTANTE: Mova este segredo para um arquivo .env em produção!
const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-super-secreto-temporario';

// Função auxiliar para gerar o token
function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '8h', // Token expira em 8 horas
  });
}

// Função para registrar o primeiro usuário (admin)
export async function register(req, res) {
  const { nome, email, password } = req.body;

  try {
    if (!nome || !email || !password) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos: nome, email e password.' });
    }

    // Verifica se já existe um usuário com este e-mail
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Usuário com este e-mail já existe.' });
    }

    const user = await User.create({ nome, email, password });

    // Não retorna o password
    user.password = undefined;

    return res.status(201).json({ user, token: generateToken(user.id) });

  } catch (err) {
    console.error('[ERRO] Falha no registro:', err);
    // Retorna um erro mais detalhado se for um erro de validação do Mongoose
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Dados inválidos.', details: err.errors });
    }
    return res.status(500).json({ error: 'Falha no registro. Verifique o console do servidor para mais detalhes.' });
  }
}

// Função de Login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, forneça e-mail e senha.' });
  }

  try {
    // Busca o usuário e inclui o password na busca
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha enviada com a senha no banco
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // --- LOG DE ACESSO ---
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await AccessLog.create({
      userId: user.id,
      ip: ip,
    });
    // --------------------

    // Gera o token
    const token = generateToken(user.id);

    // Remove a senha da resposta
    user.password = undefined;

    res.status(200).json({ user, token });

  } catch (err) {
    console.error('[ERRO] Falha no login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor. Tente novamente mais tarde.' });
  }
}