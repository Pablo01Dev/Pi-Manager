const jwt = require('jsonwebtoken');
const authConfig = {
  secret: 'seu-segredo-super-secreto', // Lembre-se de usar variáveis de ambiente!
};

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token informado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
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
