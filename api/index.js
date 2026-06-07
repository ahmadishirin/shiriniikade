const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const Product = require('./models/Product');
const Order = require('./models/Order');
const ContactMessage = require('./models/ContactMessage');

const app = express();

app.use(cors());
app.use(express.json());

// اتصال به MongoDB با کش برای محیط serverless
async function connectDB() {
  // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in environment');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    family: 4  // اجبار IPv4 (رفع مشکل IPv6 در Vercel)
  });
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
      return res.status(503).json({ error: 'خطا در اتصال به پایگاه داده', detail: err.message, offline: true });
    }
    res.status(500).json({ error: 'خطا در اتصال به پایگاه داده', detail: err.message });
  }
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'سرور فعال است' });
});

// GET /api/dbtest - تست اتصال به دیتابیس
app.get('/api/dbtest', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const uri = process.env.MONGODB_URI;
    if (!uri) return res.status(500).json({ error: 'MONGODB_URI not set' });
    const uriPrefix = uri.substring(0, 40) + '...';
    if (mongoose.connection.readyState === 1) {
      return res.json({ status: 'already_connected', uriPrefix });
    }
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 6000, connectTimeoutMS: 6000 });
    res.json({ status: 'connected_now', uriPrefix });
  } catch (err) {
    res.status(500).json({ status: 'failed', error: err.message, uriPrefix: process.env.MONGODB_URI?.substring(0, 40) + '...' });
  }
});

// GET /api/products - دریافت همه محصولات
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Products error:', err.message);
    res.status(500).json({ error: 'خطا در دریافت محصولات', detail: err.message });
  }
});

// GET /api/products/:id - دریافت یک محصول
app.get('/api/products/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'محصول یافت نشد' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت محصول' });
  }
});

// POST /api/products - افزودن محصول جدید (مدیریت)
app.post('/api/products', async (req, res) => {
  try {
    const { title, price, description, image, category, weight, people, prepare, storage } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ error: 'نام، قیمت و دسته‌بندی الزامی است' });
    }
    const product = await Product.create({ title, price, description, image, category, weight, people, prepare, storage });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'خطا در افزودن محصول' });
  }
});

// POST /api/orders - ثبت سفارش جدید
app.post('/api/orders', async (req, res) => {
  try {
    const { fullName, phone, productId, quantity, address, description } = req.body;
    if (!fullName || !phone || !productId || !address) {
      return res.status(400).json({ error: 'نام، شماره تماس، محصول و آدرس الزامی است' });
    }
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'شماره موبایل معتبر نیست. باید با 09 شروع شود و ۱۱ رقم باشد' });
    }
    if (mongoose.connection.readyState !== 1) {
      // DB در دسترس نیست - سفارش را با کد 202 قبول کن
      return res.status(202).json({
        message: 'سفارش شما دریافت شد',
        offline: true,
        order: { fullName, phone, productId, quantity: quantity || 1, address, description, status: 'در انتظار بررسی' }
      });
    }
    const order = await Order.create({
      fullName,
      phone,
      productId,
      quantity: quantity || 1,
      address,
      description,
      status: 'در انتظار بررسی'
    });
    res.status(201).json({ message: 'سفارش با موفقیت ثبت شد', order });
  } catch (err) {
    res.status(500).json({ error: 'خطا در ثبت سفارش' });
  }
});

// GET /api/orders - لیست سفارش‌ها (مدیر)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('productId', 'title price').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت سفارش‌ها' });
  }
});

// PUT /api/products/:id - ویرایش محصول
app.put('/api/products/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'محصول یافت نشد' });
    }
    const { title, price, description, image, category, weight, people, prepare, storage } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ error: 'نام، قیمت و دسته‌بندی الزامی است' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price: Number(price), description, image, category, weight, people, prepare, storage },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'خطا در ویرایش محصول' });
  }
});

// DELETE /api/products/:id - حذف محصول
app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'محصول یافت نشد' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json({ message: 'محصول حذف شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا در حذف محصول' });
  }
});

// POST /api/messages - ارسال پیام تماس با ما
app.post('/api/messages', async (req, res) => {
  try {
    const { name, contact, subject, message } = req.body;
    if (!name || !contact || !message) {
      return res.status(400).json({ error: 'نام، اطلاعات تماس و متن پیام الزامی است' });
    }
    const msg = await ContactMessage.create({ name, contact, subject, message });
    res.status(201).json({ message: 'پیام دریافت شد', id: msg._id });
  } catch (err) {
    res.status(500).json({ error: 'خطا در ذخیره پیام' });
  }
});

// GET /api/messages - لیست پیام‌های تماس (مدیر)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت پیام‌ها' });
  }
});

// PATCH /api/messages/:id/read - علامت‌گذاری پیام به عنوان خوانده‌شده
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'بروزرسانی شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا' });
  }
});

// اجرای محلی در محیط توسعه
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
