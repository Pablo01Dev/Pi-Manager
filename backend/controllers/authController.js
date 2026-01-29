const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = {
  secret: 'seu-segredo-super-secreto', // Troque por uma variável de ambiente!
  expiresIn: '1d',
};

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
}

module.exports = {
  async register(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'Usuário já existe' });
      }
      const user = await User.create(req.body);
      user.senha = undefined;
      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no registro' });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await User.findOne({ email }).select('+senha');
      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
      }
      if (!(await bcrypt.compare(senha, user.senha))) {
        return res.status(400).send({ error: 'Senha inválida' });
      }
      user.senha = undefined;
      res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Erro no login, tente novamente' });
    }
  },
};
