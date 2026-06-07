const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  weight: { type: String, default: '' },
  people: { type: String, default: '' },
  prepare: { type: String, default: '' },
  storage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
