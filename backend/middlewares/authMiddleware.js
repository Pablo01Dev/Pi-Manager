import jwt from 'jsonwebtoken';

const authConfig = {
  secret: process.env.JWT_SECRET || 'seu-segredo-super-secreto', // Lembre-se de usar variáveis de ambiente!
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token informado' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) { // Correção aqui: a verificação estava incorreta
    return res.status(401).send({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.user = { id: decoded.id };
    return next();
  });
};

export default authMiddleware;

