const BASE = '/api';

// داده‌های ثابت برای زمانی که API در دسترس نباشد
const FALLBACK_PRODUCTS = [
  { _id: 'f1', title: 'کیک تولد شکلاتی', category: 'کیک تولد', price: 450000, image: '/img/chocolate-cake.svg', description: 'کیک تولد شکلاتی با لایه‌های اسفنجی تازه، خامه شکلاتی، تزئینات ساده و طعم ملایم تهیه می‌شود.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f2', title: 'کیک ردولوت', category: 'کیک تولد', price: 550000, image: '/img/red-velvet.svg', description: 'کیک ردولوت با رنگ جذاب، بافت لطیف و کرم مخصوص آماده می‌شود.', weight: 'حدود ۱.۲ کیلوگرم', people: '۸ تا ۱۰ نفر', prepare: '۲۴ تا ۳۶ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f3', title: 'کیک خامه‌ای میوه‌ای', category: 'کیک تولد', price: 500000, image: '/img/fruit-cake.svg', description: 'این کیک با خامه تازه، اسفنج نرم و میوه‌های فصل آماده می‌شود.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f4', title: 'کیک موکا', category: 'کیک تولد', price: 480000, image: '/img/chocolate-cake.svg', description: 'کیک موکا با لایه‌های اسفنجی آغشته به قهوه و کرم موکا.', weight: 'حدود ۱.۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f5', title: 'کیک هویج', category: 'کیک تولد', price: 420000, image: '/img/fruit-cake.svg', description: 'کیک هویج با بافت مرطوب، ادویه گرم و کرم پنیری سبک.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f6', title: 'کیک لیمویی', category: 'کیک تولد', price: 390000, image: '/img/fruit-cake.svg', description: 'کیک لیمویی با اسفنجی سبک، کرم لیمو خانگی و گلیز لیمو.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f7', title: 'کیک نارگیلی', category: 'کیک تولد', price: 460000, image: '/img/fruit-cake.svg', description: 'کیک نارگیلی با اسفنج نرم، کرم شیرین نارگیل و پوشش نارگیل تازه.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f8', title: 'کیک جنگل سیاه', category: 'کیک تولد', price: 520000, image: '/img/chocolate-cake.svg', description: 'کیک جنگل سیاه با اسفنج کاکائو، کرم شانتی و گیلاس‌های تازه.', weight: 'حدود ۱.۲ کیلوگرم', people: '۸ تا ۱۰ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f9', title: 'کیک اپرا', category: 'کیک تولد', price: 580000, image: '/img/chocolate-cake.svg', description: 'کیک اپرا با لایه‌های ژوکوند، کرم موکا و گاناش شکلاتی.', weight: 'حدود ۱ کیلوگرم', people: '۶ تا ۸ نفر', prepare: '۳۶ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f10', title: 'شیرینی خشک مخلوط', category: 'شیرینی خشک', price: 280000, image: '/img/dry-pastry.svg', description: 'شیرینی خشک مخلوط شامل چند مدل شیرینی خوش‌طعم برای پذیرایی.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f11', title: 'باقلوا', category: 'شیرینی خشک', price: 390000, image: '/img/baklava.svg', description: 'باقلوا با لایه‌های نازک، مغز تازه و شهد کنترل‌شده.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f12', title: 'نان برنجی', category: 'شیرینی خشک', price: 250000, image: '/img/dry-pastry.svg', description: 'نان برنجی با آرد برنج، کره، هل و گلاب تهیه می‌شود.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f13', title: 'گز اصفهانی', category: 'شیرینی خشک', price: 430000, image: '/img/dry-pastry.svg', description: 'گز اصفهانی با مواد اولیه طبیعی، پسته و بادام درجه یک.', weight: 'نیم کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f14', title: 'کلوچه سنتی', category: 'شیرینی خشک', price: 260000, image: '/img/dry-pastry.svg', description: 'کلوچه سنتی با خمیر نرم، مغز خرما و گردو.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f15', title: 'نان گردویی', category: 'شیرینی خشک', price: 310000, image: '/img/dry-pastry.svg', description: 'نان گردویی با مغز گردو درجه یک، دارچین و کمی عسل.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در جای خشک و خنک' },
  { _id: 'f16', title: 'شیرینی تر خامه‌ای', category: 'شیرینی تر', price: 320000, image: '/img/wet-pastry.svg', description: 'شیرینی تر خامه‌ای با مواد اولیه تازه.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'در یخچال نگهداری شود' },
  { _id: 'f17', title: 'زولبیا و بامیه', category: 'شیرینی تر', price: 290000, image: '/img/wet-pastry.svg', description: 'زولبیا و بامیه تازه با شهد عسل کنترل‌شده.', weight: 'یک کیلوگرم', people: 'مناسب پذیرایی', prepare: 'آماده ارسال', storage: 'روز اول مصرف شود' },
  { _id: 'f18', title: 'رولت خامه‌ای', category: 'شیرینی تر', price: 340000, image: '/img/wet-pastry.svg', description: 'رولت خامه‌ای با اسفنج نرم، خامه تازه و مربای توت‌فرنگی.', weight: 'حدود ۶۰۰ گرم', people: '۶ تا ۸ نفر', prepare: 'آماده ارسال', storage: 'در یخچال نگهداری شود' },
  { _id: 'f19', title: 'تیرامیسو', category: 'دسر', price: 260000, image: '/img/tiramisu.svg', description: 'تیرامیسو دسری خوش‌طعم و لطیف با طعم قهوه و کرم سبک.', weight: 'ظرف متوسط', people: '۳ تا ۴ نفر', prepare: '۱۲ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f20', title: 'ماکارون رنگی', category: 'دسر', price: 350000, image: '/img/macaron.svg', description: 'ماکارون رنگی با ظاهر فانتزی، بافت لطیف و طعم‌های متنوع.', weight: 'بسته ۱۲ عددی', people: 'مناسب پذیرایی', prepare: '۲۴ ساعت', storage: 'در جای خشک و خنک' },
  { _id: 'f21', title: 'براونی شکلاتی', category: 'دسر', price: 220000, image: '/img/chocolate-cake.svg', description: 'براونی شکلاتی با بافت فاجی، مغز گردو و شکلات تلخ درجه اول.', weight: 'بسته ۶ عددی', people: '۶ نفر', prepare: '۶ ساعت', storage: 'در جای خنک نگهداری شود' },
  { _id: 'f22', title: 'چیزکیک', category: 'دسر', price: 310000, image: '/img/tiramisu.svg', description: 'چیزکیک با پایه بیسکویتی کره‌ای و فیلینگ پنیر خامه‌ای.', weight: 'ظرف متوسط', people: '۴ تا ۶ نفر', prepare: '۲۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f23', title: 'کرم کارامل', category: 'دسر', price: 180000, image: '/img/tiramisu.svg', description: 'کرم کارامل با بافت لرزان، سس کارامل خانگی و طعم وانیل.', weight: 'ظرف کوچک', people: '۲ تا ۳ نفر', prepare: '۶ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f24', title: 'پاناکوتا', category: 'دسر', price: 200000, image: '/img/tiramisu.svg', description: 'پاناکوتا با کرم تازه، وانیل و سس میوه.', weight: 'ظرف کوچک', people: '۲ نفر', prepare: '۶ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f25', title: 'موس شکلات', category: 'دسر', price: 240000, image: '/img/tiramisu.svg', description: 'موس شکلات با شکلات تلخ ۷۰٪ و کرم فرم‌گرفته.', weight: 'ظرف متوسط', people: '۲ تا ۳ نفر', prepare: '۴ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f26', title: 'شله‌زرد', category: 'دسر', price: 150000, image: '/img/tiramisu.svg', description: 'شله‌زرد با برنج ایرانی، زعفران اصیل و گلاب.', weight: 'ظرف بزرگ', people: '۸ تا ۱۰ نفر', prepare: '۶ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f27', title: 'کیک سفارشی مناسبتی', category: 'محصولات مناسبتی', price: 700000, image: '/img/custom-cake.svg', description: 'کیک سفارشی مناسبتی بر اساس طرح و سلیقه مشتری آماده می‌شود.', weight: 'قابل انتخاب', people: 'بسته به وزن', prepare: '۴۸ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f28', title: 'کاپ‌کیک مخلوط', category: 'محصولات مناسبتی', price: 360000, image: '/img/custom-cake.svg', description: 'بسته ۶ عددی کاپ‌کیک با طعم‌های مختلف و تزئینات رنگارنگ.', weight: 'بسته ۶ عددی', people: '۶ نفر', prepare: '۱۲ ساعت', storage: 'در یخچال نگهداری شود' },
  { _id: 'f29', title: 'کیک چند طبقه عروسی', category: 'محصولات مناسبتی', price: 1800000, image: '/img/custom-cake.svg', description: 'کیک عروسی سه طبقه با تزئینات گل‌های خامه‌ای و فوندانت.', weight: '۴ تا ۶ کیلوگرم', people: '۳۰ تا ۵۰ نفر', prepare: '۷۲ ساعت', storage: 'در یخچال نگهداری شود' }
];

export async function getProducts() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${BASE}/products`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return FALLBACK_PRODUCTS;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export { FALLBACK_PRODUCTS };

export async function getProduct(id) {
  // اگر ID جعلی (fallback) باشد، مستقیم از FALLBACK_PRODUCTS برگردان
  if (String(id).startsWith('f')) {
    const found = FALLBACK_PRODUCTS.find(p => p._id === id);
    if (found) return found;
    throw new Error('محصول یافت نشد');
  }
  try {
    const res = await fetch(`${BASE}/products/${id}`);
    if (!res.ok) throw new Error('محصول یافت نشد');
    return res.json();
  } catch (err) {
    throw err;
  }
}

export async function createOrder(data) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  // 201 = ذخیره در DB  |  202 = پذیرفته‌شده بدون DB (offline)
  if (res.status === 201 || res.status === 202) return json;
  throw new Error(json.error || 'خطا در ثبت سفارش');
}

export async function createProduct(data) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'خطا در افزودن محصول');
  return json;
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'خطا در ویرایش محصول');
  return json;
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'خطا در حذف محصول');
  return json;
}

export async function createMessage(data) {
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'خطا در ارسال پیام');
  return json;
}

export async function getMessages() {
  const res = await fetch(`${BASE}/messages`);
  if (!res.ok) return [];
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${BASE}/orders`);
  if (!res.ok) return [];
  return res.json();
}

export async function markMessageRead(id) {
  await fetch(`${BASE}/messages/${id}/read`, { method: 'PATCH' });
}
