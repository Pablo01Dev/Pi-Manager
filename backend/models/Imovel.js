import mongoose from 'mongoose';

const imovelSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  endereco: { // 🆕 Campo novo
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: [
      'cadastrar',
      'fazer tour 360º',
      'fazer video',
      'concluído',
      'disponivel'
    ],
    default: 'cadastrar'
  },
  imagens: [
    {
      nome: String,
      filename: String,
      link: String
    }
  ],
  video: {
    nome: String,
    link: String
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  ordem: {
    type: Number,
    default: 0
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export default mongoose.model('Imovel', imovelSchema);
