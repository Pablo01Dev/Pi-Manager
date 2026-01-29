import express from 'express';
import {
  criarImovel,
  listarImoveis,
  deletarImovel,
  atualizarStatus,
  atualizarImovel,
  atualizarOrdem,
} from '../controllers/imovelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// 🏠 CRUD básico
router.get('/', listarImoveis);              // Listar todos os imóveis
router.post('/', criarImovel);               // Criar novo imóvel
router.put('/:id', atualizarImovel);         // Atualizar informações gerais
router.delete('/:id', deletarImovel);        // Deletar imóvel

// 🔄 Extras
router.patch('/:id/status', atualizarStatus); // Atualizar status do imóvel
router.put('/ordem', atualizarOrdem);         // Atualizar ordem dos imóveis

export default router;
