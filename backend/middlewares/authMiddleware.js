import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token informado' });
  }

  // Divide o header em duas partes: "Bearer" e o "token"
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  // Verifica se a primeira parte contém a palavra "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatado' });
  }

  // Verifica o token usando A MESMA chave do ambiente
  // Se process.env.JWT_SECRET estiver vazio, o jwt.verify vai lançar erro
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }

    // Salva o ID do usuário na requisição para ser usado nas próximas rotas
    req.user = { id: decoded.id };
    
    return next();
  });
};

export default authMiddleware;