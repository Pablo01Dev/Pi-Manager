import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { // Renomeado de 'senha' para 'password'
    type: String,
    required: true,
    select: false, // Não retorna o password em queries por padrão
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

// Hook para fazer o hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  // Gera o hash apenas se a senha foi modificada (ou é nova)
  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
