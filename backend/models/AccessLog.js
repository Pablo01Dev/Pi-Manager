import mongoose from 'mongoose';

const AccessLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dataHora: {
    type: Date,
    default: Date.now,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});

const AccessLog = mongoose.model('AccessLog', AccessLogSchema);

export default AccessLog;
