import Imovel from '../models/Imovel.js';
import mongoose from 'mongoose';

// ==================================================
// 🏠 Criar imóvel
// ==================================================
export const criarImovel = async (req, res) => {
  try {
    const { titulo, descricao, status, endereco } = req.body;

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ erro: 'O campo título é obrigatório.' });
    }

    const novoImovel = new Imovel({
      titulo,
      descricao: descricao || '',
      endereco: endereco || '', // ✅ novo campo
      status: status || 'cadastrar',
      usuario: req.user.id,
    });

    await novoImovel.save();
    res.status(201).json({ sucesso: true, imovel: novoImovel });

  } catch (err) {
    console.error('[ERRO] Erro ao criar imóvel:', err);
    res.status(500).json({ erro: 'Erro ao criar imóvel: ' + err.message });
  }
};

// ==================================================
// 🔄 Atualizar status do imóvel
// ==================================================
export const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const statusValidos = ['cadastrar', 'fazer video', 'fazer tour 360º', 'concluído', 'disponivel'];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }

  try {
    const imovel = await Imovel.findOne({ _id: id, usuario: req.user.id });
    if (!imovel) return res.status(404).json({ erro: 'Imóvel não encontrado.' });

    imovel.status = status;
    await imovel.save();

    res.status(200).json({ sucesso: true, imovel });
  } catch (err) {
    console.error('[ERRO] Erro ao atualizar status:', err);
    res.status(500).json({ erro: 'Erro ao atualizar status: ' + err.message });
  }
};

// ==================================================
// 📋 Listar imóveis
// ==================================================
export const listarImoveis = async (req, res) => {
  try {
    const imoveis = await Imovel.find({ usuario: req.user.id });
    res.status(200).json(imoveis);
  } catch (err) {
    console.error('[ERRO] Erro ao listar imóveis:', err);
    res.status(500).json({ erro: 'Erro ao listar imóveis: ' + err.message });
  }
};

// ==================================================
// 🗑 Deletar imóvel
// ==================================================
export const deletarImovel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  try {
    const imovel = await Imovel.findOne({ _id: id, usuario: req.user.id });
    if (!imovel) {
      return res.status(404).json({ erro: 'Imóvel não encontrado.' });
    }

    await Imovel.findByIdAndDelete(id);
    res.status(200).json({ sucesso: true, mensagem: 'Imóvel removido com sucesso.' });
  } catch (err) {
    console.error('[ERRO] Erro ao deletar imóvel:', err);
    res.status(500).json({ erro: 'Erro ao excluir imóvel: ' + err.message });
  }
};

// ==================================================
// ✏️ Atualizar dados gerais do imóvel
// ==================================================
export const atualizarImovel = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  try {
    const imovel = await Imovel.findOneAndUpdate(
      { _id: id, usuario: req.user.id },
      dadosAtualizados,
      { new: true }
    );
    if (!imovel) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
    res.json(imovel);
  } catch (err) {
    console.error('[ERRO] Erro ao atualizar imóvel:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar imóvel.' });
  }
};

// ==================================================
// ↕ Atualizar ordem dos imóveis
// ==================================================
export const atualizarOrdem = async (req, res) => {
  const { novaOrdem } = req.body;
  if (!Array.isArray(novaOrdem) || !novaOrdem.length) {
    return res.status(400).json({ message: 'Array novaOrdem inválido.' });
  }

  try {
    const imoveisDoUsuario = await Imovel.find({ usuario: req.user.id }).select('_id');
    const imoveisDoUsuarioIds = imoveisDoUsuario.map(i => i._id.toString());

    const operacoes = novaOrdem.map((item, i) => {
      if (imoveisDoUsuarioIds.includes(item._id)) {
        return Imovel.findByIdAndUpdate(item._id, { ordem: i });
      }
      return null;
    }).filter(Boolean);


    await Promise.all(operacoes);
    res.status(200).json({ message: 'Ordem atualizada com sucesso!' });
  } catch (err) {
    console.error('[ERRO] Erro ao atualizar ordem:', err);
    res.status(500).json({ message: 'Erro ao atualizar ordem.' });
  }
};

