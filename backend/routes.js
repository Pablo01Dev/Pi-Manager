import express from 'express';
import imovelRoutes from './routes/imovel.routes.js';
import placaRoutes from './routes/placa.routes.js';
import authRoutes from './routes/auth.routes.js';

const router = express.Router();

router.get('/', (req, res) => res.send('API funcionando!'));
router.use('/imoveis', imovelRoutes);
router.use('/placas', placaRoutes);
router.use('/auth', authRoutes);

export default router;
