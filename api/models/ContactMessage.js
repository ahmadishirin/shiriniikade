const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  subject: { type: String, default: 'سوال درباره محصولات' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
