const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  address: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'در انتظار بررسی' }
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
