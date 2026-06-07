const products = [
  {
    id: "chocolate-birthday-cake",
    name: "کیک تولد شکلاتی",
    category: "کیک تولد",
    price: 450000,
    image: "assets/img/chocolate-cake.svg",
    shortDescription: "کیک شکلاتی نرم با خامه تازه و تزئینات مخصوص جشن تولد.",
    description: "کیک تولد شکلاتی با لایه‌های اسفنجی تازه، خامه شکلاتی، تزئینات ساده و طعم ملایم تهیه می‌شود. این محصول برای جشن تولد، دورهمی خانوادگی و مناسبت‌های خاص انتخابی مناسب است.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "red-velvet-cake",
    name: "کیک ردولوت",
    category: "کیک تولد",
    price: 550000,
    image: "assets/img/red-velvet.svg",
    shortDescription: "کیک ردولوت با کرم پنیری و ظاهر شیک برای مراسم خاص.",
    description: "کیک ردولوت با رنگ جذاب، بافت لطیف و کرم مخصوص آماده می‌شود. این محصول برای جشن‌های رسمی و تولدهای خاص بسیار مناسب است.",
    weight: "حدود ۱.۲ کیلوگرم",
    people: "۸ تا ۱۰ نفر",
    prepare: "۲۴ تا ۳۶ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "cream-cake",
    name: "کیک خامه‌ای میوه‌ای",
    category: "کیک تولد",
    price: 500000,
    image: "assets/img/fruit-cake.svg",
    shortDescription: "کیک خامه‌ای سبک با میوه تازه و تزئینات ساده.",
    description: "این کیک با خامه تازه، اسفنج نرم و میوه‌های فصل آماده می‌شود و برای جشن‌های خانوادگی گزینه‌ای سبک و خوش‌طعم است.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "dry-pastry",
    name: "شیرینی خشک مخلوط",
    category: "شیرینی خشک",
    price: 280000,
    image: "assets/img/dry-pastry.svg",
    shortDescription: "ترکیبی از شیرینی‌های خشک مناسب پذیرایی و مهمانی.",
    description: "شیرینی خشک مخلوط شامل چند مدل شیرینی خوش‌طعم و سبک است که برای پذیرایی، دورهمی و مصرف روزانه مناسب می‌باشد.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "wet-pastry",
    name: "شیرینی تر خامه‌ای",
    category: "شیرینی تر",
    price: 320000,
    image: "assets/img/wet-pastry.svg",
    shortDescription: "شیرینی تر تازه با خامه سبک و طعم خانگی.",
    description: "شیرینی تر خامه‌ای با مواد اولیه تازه و کیفیت مناسب آماده می‌شود و برای پذیرایی در جشن‌ها و مناسبت‌ها کاربرد دارد.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "baklava",
    name: "باقلوا",
    category: "شیرینی خشک",
    price: 390000,
    image: "assets/img/baklava.svg",
    shortDescription: "باقلوا با مغز تازه، شهد ملایم و طعم اصیل.",
    description: "باقلوا با لایه‌های نازک، مغز تازه و شهد کنترل‌شده تهیه می‌شود و برای پذیرایی رسمی انتخابی مناسب است.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "tiramisu",
    name: "تیرامیسو",
    category: "دسر",
    price: 260000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "دسر تیرامیسو با طعم قهوه و کرم لطیف.",
    description: "تیرامیسو دسری خوش‌طعم و لطیف است که با طعم قهوه، کرم سبک و بافت نرم آماده می‌شود.",
    weight: "ظرف متوسط",
    people: "۳ تا ۴ نفر",
    prepare: "۱۲ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "macaron",
    name: "ماکارون رنگی",
    category: "دسر",
    price: 350000,
    image: "assets/img/macaron.svg",
    shortDescription: "ماکارون‌های رنگی با طعم‌های متنوع و ظاهر جذاب.",
    description: "ماکارون رنگی با ظاهر فانتزی، بافت لطیف و طعم‌های متنوع برای هدیه، پذیرایی و مناسبت‌های خاص مناسب است.",
    weight: "بسته ۱۲ عددی",
    people: "مناسب پذیرایی",
    prepare: "۲۴ ساعت",
    storage: "در جای خشک و خنک"
  },
  {
    id: "custom-cake",
    name: "کیک سفارشی مناسبتی",
    category: "محصولات مناسبتی",
    price: 700000,
    image: "assets/img/custom-cake.svg",
    shortDescription: "کیک سفارشی با طرح دلخواه برای جشن‌ها و مراسم خاص.",
    description: "کیک سفارشی مناسبتی بر اساس طرح، متن و سلیقه مشتری آماده می‌شود. قیمت نهایی بر اساس وزن، طرح و نوع تزئین قابل تغییر است.",
    weight: "قابل انتخاب",
    people: "بسته به وزن",
    prepare: "۴۸ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "mocha-cake",
    name: "کیک موکا",
    category: "کیک تولد",
    price: 480000,
    image: "assets/img/chocolate-cake.svg",
    shortDescription: "کیک موکا با طعم قهوه و شکلات تلخ برای عاشقان کافه.",
    description: "کیک موکا با لایه‌های اسفنجی آغشته به قهوه، کرم موکا و تزئینات شکلاتی، انتخابی متفاوت برای جشن‌ها و مهمانی‌های خاص است.",
    weight: "حدود ۱.۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "carrot-cake",
    name: "کیک هویج",
    category: "کیک تولد",
    price: 420000,
    image: "assets/img/fruit-cake.svg",
    shortDescription: "کیک هویج با کرم پنیر و دارچین، سالم و خوش‌طعم.",
    description: "کیک هویج با بافت مرطوب، ادویه گرم و کرم پنیری سبک، یک انتخاب متفاوت و سالم برای کسانی است که به دنبال طعم خاص هستند.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "lemon-cake",
    name: "کیک لیمویی",
    category: "کیک تولد",
    price: 390000,
    image: "assets/img/fruit-cake.svg",
    shortDescription: "کیک لیمویی تازه با کرم لیمو و طعم ترش ملایم.",
    description: "کیک لیمویی با اسفنجی سبک، کرم لیمو خانگی و گلیز لیمو، یک طعم تازه و دلنشین برای فصل گرم و مهمانی‌های بهاره.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "coconut-cake",
    name: "کیک نارگیلی",
    category: "کیک تولد",
    price: 460000,
    image: "assets/img/fruit-cake.svg",
    shortDescription: "کیک نارگیلی با پوشش نارگیل رنده‌شده و کرم شیر.",
    description: "کیک نارگیلی با اسفنج نرم، کرم شیرین نارگیل و پوشش نارگیل تازه رنده‌شده، یک طعم استوایی در هر مناسبت.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "brownie",
    name: "براونی شکلاتی",
    category: "دسر",
    price: 220000,
    image: "assets/img/chocolate-cake.svg",
    shortDescription: "براونی فشرده شکلاتی با مغز گردو و بافت فاج.",
    description: "براونی شکلاتی با بافت چسبنده و فاجی، مغز گردو و شکلات تلخ درجه اول. مناسب دسر جشن، پذیرایی یا هدیه.",
    weight: "بسته ۶ عددی",
    people: "۶ نفر",
    prepare: "۶ ساعت",
    storage: "در جای خنک نگهداری شود"
  },
  {
    id: "cheesecake",
    name: "چیزکیک",
    category: "دسر",
    price: 310000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "چیزکیک نیویورکی با پایه بیسکویتی و کرم پنیر.",
    description: "چیزکیک سبک با پایه بیسکویتی کره‌ای، فیلینگ پنیر خامه‌ای و سس توت‌فرنگی. یکی از محبوب‌ترین دسرها برای مناسبت‌های خاص.",
    weight: "ظرف متوسط",
    people: "۴ تا ۶ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "creme-caramel",
    name: "کرم کارامل",
    category: "دسر",
    price: 180000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "کرم کارامل ابریشمی با سس کارامل طلایی.",
    description: "کرم کارامل با بافت لرزان و صاف، سس کارامل خانگی و طعم وانیل، دسری کلاسیک و همیشه پرطرفدار در مهمانی‌ها.",
    weight: "ظرف کوچک",
    people: "۲ تا ۳ نفر",
    prepare: "۶ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "panna-cotta",
    name: "پاناکوتا",
    category: "دسر",
    price: 200000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "دسر ایتالیایی پاناکوتا با سس توت‌فرنگی.",
    description: "پاناکوتا با کرم تازه، وانیل و سس میوه، یک دسر سبک و شیک برای میهمانی‌های رسمی و روزمره.",
    weight: "ظرف کوچک",
    people: "۲ نفر",
    prepare: "۶ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "chocolate-mousse",
    name: "موس شکلات",
    category: "دسر",
    price: 240000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "موس شکلات تلخ با بافت ابری و سبک.",
    description: "موس شکلات با شکلات تلخ ۷۰٪، کرم فرم‌گرفته و طعمی غنی اما سبک. برای کسانی که شکلات را دوست دارند.",
    weight: "ظرف متوسط",
    people: "۲ تا ۳ نفر",
    prepare: "۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "nan-berenji",
    name: "نان برنجی",
    category: "شیرینی خشک",
    price: 250000,
    image: "assets/img/dry-pastry.svg",
    shortDescription: "نان برنجی اصیل با هل و گلاب، طعمی اصیل ایرانی.",
    description: "نان برنجی با آرد برنج، کره، هل و گلاب تهیه می‌شود. این شیرینی سنتی ایرانی برای عید نوروز، پذیرایی و هدیه بسیار مناسب است.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "gaz",
    name: "گز اصفهانی",
    category: "شیرینی خشک",
    price: 430000,
    image: "assets/img/dry-pastry.svg",
    shortDescription: "گز اصفهانی اصیل با پسته و بادام درجه یک.",
    description: "گز اصفهانی با مواد اولیه طبیعی، پسته و بادام درجه یک تهیه می‌شود. یک هدیه لوکس و اصیل ایرانی برای مناسبت‌های مختلف.",
    weight: "نیم کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "koloocheh",
    name: "کلوچه سنتی",
    category: "شیرینی خشک",
    price: 260000,
    image: "assets/img/dry-pastry.svg",
    shortDescription: "کلوچه سنتی با مغز خرما و گردو.",
    description: "کلوچه سنتی با خمیر نرم، مغز خرما و گردو، یک شیرینی اصیل ایرانی که برای هر مناسبتی مناسب است.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "zoolbia-bamiyeh",
    name: "زولبیا و بامیه",
    category: "شیرینی تر",
    price: 290000,
    image: "assets/img/wet-pastry.svg",
    shortDescription: "زولبیا و بامیه تازه با شهد عسل ملایم.",
    description: "زولبیا و بامیه تازه با شهد عسل کنترل‌شده، مناسب ماه رمضان، عیدها و پذیرایی‌های خاص. تازه و داغ سرو می‌شود.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "روز اول مصرف شود"
  },
  {
    id: "rollet-khamei",
    name: "رولت خامه‌ای",
    category: "شیرینی تر",
    price: 340000,
    image: "assets/img/wet-pastry.svg",
    shortDescription: "رولت اسفنجی با خامه تازه و مربای توت‌فرنگی.",
    description: "رولت خامه‌ای با اسفنج نرم، خامه تازه فرم‌گرفته و مربای خانگی توت‌فرنگی. یک شیرینی تر خوش‌ظاهر برای پذیرایی رسمی.",
    weight: "حدود ۶۰۰ گرم",
    people: "۶ تا ۸ نفر",
    prepare: "آماده ارسال",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "cupcake",
    name: "کاپ‌کیک مخلوط",
    category: "محصولات مناسبتی",
    price: 360000,
    image: "assets/img/custom-cake.svg",
    shortDescription: "بسته ۶ عددی کاپ‌کیک با طعم‌های مختلف.",
    description: "بسته ۶ عددی کاپ‌کیک با طعم‌های شکلاتی، وانیل و توت‌فرنگی، با تزئینات رنگارنگ. مناسب تولد، جشن مهرگان و هدیه.",
    weight: "بسته ۶ عددی",
    people: "۶ نفر",
    prepare: "۱۲ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "wedding-cake",
    name: "کیک چند طبقه عروسی",
    category: "محصولات مناسبتی",
    price: 1800000,
    image: "assets/img/custom-cake.svg",
    shortDescription: "کیک عروسی چند طبقه با تزئینات فانتزی.",
    description: "کیک عروسی سه طبقه با تزئینات گل‌های خامه‌ای، فوندانت و طراحی سفارشی. قیمت بسته به طبقات و طرح نهایی تغییر می‌کند.",
    weight: "۴ تا ۶ کیلوگرم",
    people: "۳۰ تا ۵۰ نفر",
    prepare: "۷۲ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "black-forest",
    name: "کیک جنگل سیاه",
    category: "کیک تولد",
    price: 520000,
    image: "assets/img/chocolate-cake.svg",
    shortDescription: "کیک جنگل سیاه با گیلاس تازه و کرم شانتی.",
    description: "کیک جنگل سیاه با لایه‌های اسفنج کاکائو، کرم شانتی، گیلاس‌های تازه و تراشه شکلات. کلاسیکی بی‌نظیر برای تولدهای خاص.",
    weight: "حدود ۱.۲ کیلوگرم",
    people: "۸ تا ۱۰ نفر",
    prepare: "۲۴ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "opera-cake",
    name: "کیک اپرا",
    category: "کیک تولد",
    price: 580000,
    image: "assets/img/chocolate-cake.svg",
    shortDescription: "کیک اپرا فرانسوی با لایه‌های قهوه و گاناش شکلات.",
    description: "کیک اپرا با لایه‌های ظریف ژوکوند، کرم موکا، گاناش شکلاتی و گلیز آینه‌ای، یک شاهکار قنادی فرانسوی.",
    weight: "حدود ۱ کیلوگرم",
    people: "۶ تا ۸ نفر",
    prepare: "۳۶ ساعت",
    storage: "در یخچال نگهداری شود"
  },
  {
    id: "nan-gerdooee",
    name: "نان گردویی",
    category: "شیرینی خشک",
    price: 310000,
    image: "assets/img/dry-pastry.svg",
    shortDescription: "نان گردویی با مغز گردو و دارچین، عطری خاص.",
    description: "نان گردویی با مغز گردو درجه یک، دارچین و کمی عسل، شیرینی‌ای مغذی و خوش‌طعم برای پذیرایی خاص.",
    weight: "یک کیلوگرم",
    people: "مناسب پذیرایی",
    prepare: "آماده ارسال",
    storage: "در جای خشک و خنک"
  },
  {
    id: "sholeh-zard",
    name: "شله‌زرد",
    category: "دسر",
    price: 150000,
    image: "assets/img/tiramisu.svg",
    shortDescription: "شله‌زرد سنتی با زعفران، دارچین و گلاب.",
    description: "شله‌زرد با برنج ایرانی، زعفران اصیل، گلاب و تزئین دارچین، یک دسر سنتی ایرانی برای نذری، عزاداری و جشن‌ها.",
    weight: "ظرف بزرگ",
    people: "۸ تا ۱۰ نفر",
    prepare: "۶ ساعت",
    storage: "در یخچال نگهداری شود"
  }
];

const categories = ["همه محصولات", ...new Set(products.map((product) => product.category))];

const toman = (value) => Number(value).toLocaleString("fa-IR") + " تومان";

function setActiveNavigation() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

function productCard(product) {
  return `
    <div class="col-12 col-sm-6 col-lg-4 product-item" data-category="${product.category}" data-name="${product.name}">
      <div class="product-card">
        <a href="product-details.html?id=${product.id}" aria-label="مشاهده جزئیات ${product.name}">
          <img src="${product.image}" class="product-img" alt="${product.name}">
        </a>
        <div class="card-body">
          <span class="badge-category mb-2">${product.category}</span>
          <h5 class="fw-bold mt-2">${product.name}</h5>
          <p class="text-muted small mb-3">${product.shortDescription}</p>
          <div class="d-flex align-items-center justify-content-between gap-2">
            <span class="price">${toman(product.price)}</span>
            <a class="btn btn-outline-custom btn-sm" href="product-details.html?id=${product.id}">مشاهده جزئیات</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;
  container.innerHTML = products.slice(0, 4).map((product) => `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="product-card">
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" class="product-img" alt="${product.name}">
        </a>
        <div class="card-body">
          <span class="badge-category mb-2">${product.category}</span>
          <h5 class="fw-bold">${product.name}</h5>
          <p class="price mb-3">${toman(product.price)}</p>
          <a href="product-details.html?id=${product.id}" class="btn btn-outline-custom btn-sm w-100">مشاهده جزئیات</a>
        </div>
      </div>
    </div>
  `).join("");
}

function renderProductList(list = products) {
  const container = document.getElementById("productsList");
  const resultCount = document.getElementById("resultCount");
  if (!container) return;

  if (resultCount) {
    resultCount.textContent = `${list.length.toLocaleString("fa-IR")} محصول یافت شد`;
  }

  if (!list.length) {
    container.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <h5 class="fw-bold mb-2">محصولی یافت نشد</h5>
          <p class="mb-0">عبارت جستجو یا دسته‌بندی انتخاب‌شده را تغییر دهید.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(productCard).join("");
}

function setupCategoryFilters() {
  const filterContainer = document.getElementById("categoryFilters");
  const mobileFilter = document.getElementById("mobileCategoryFilter");
  if (!filterContainer && !mobileFilter) return;

  if (filterContainer) {
    filterContainer.innerHTML = categories.map((category, index) => `
      <button class="category-btn ${index === 0 ? "active" : ""}" data-category-filter="${category}">${category}</button>
    `).join("");
  }

  if (mobileFilter) {
    mobileFilter.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  }
}

function getFilteredProducts() {
  const searchInput = document.getElementById("productSearch");
  const activeButton = document.querySelector("[data-category-filter].active");
  const mobileFilter = document.getElementById("mobileCategoryFilter");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const category = activeButton?.dataset.categoryFilter || mobileFilter?.value || "همه محصولات";

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query) || product.shortDescription.toLowerCase().includes(query);
    const matchesCategory = category === "همه محصولات" || product.category === category;
    return matchesSearch && matchesCategory;
  });
}

function applyProductFilters() {
  renderProductList(getFilteredProducts());
}

function setupProductsPage() {
  const productsList = document.getElementById("productsList");
  if (!productsList) return;

  setupCategoryFilters();
  renderProductList(products);

  const searchInput = document.getElementById("productSearch");
  searchInput?.addEventListener("input", applyProductFilters);

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-category-filter]");
    if (!btn) return;
    document.querySelectorAll("[data-category-filter]").forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
    const mobileFilter = document.getElementById("mobileCategoryFilter");
    if (mobileFilter) mobileFilter.value = btn.dataset.categoryFilter;
    applyProductFilters();
  });

  document.getElementById("mobileCategoryFilter")?.addEventListener("change", (event) => {
    const category = event.target.value;
    document.querySelectorAll("[data-category-filter]").forEach((item) => {
      item.classList.toggle("active", item.dataset.categoryFilter === category);
    });
    applyProductFilters();
  });
}

function setupHomeSearch() {
  const form = document.getElementById("homeSearchForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = document.getElementById("homeSearchInput").value.trim();
    window.location.href = `products.html${value ? `?search=${encodeURIComponent(value)}` : ""}`;
  });
}

function readQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function applyInitialProductSearch() {
  const search = readQueryParam("search");
  const input = document.getElementById("productSearch");
  if (search && input) {
    input.value = search;
    applyProductFilters();
  }
}

function setupProductDetailsPage() {
  const detailContainer = document.getElementById("productDetails");
  if (!detailContainer) return;

  const id = readQueryParam("id") || products[0].id;
  const product = products.find((item) => item.id === id) || products[0];
  document.title = `${product.name} | شیرینی‌کده`;

  detailContainer.innerHTML = `
    <div class="col-lg-7">
      <div class="detail-gallery-main">
        <img src="${product.image}" class="detail-main-img" alt="${product.name}">
      </div>
    </div>
    <div class="col-lg-5">
      <div class="product-info-box h-100">
        <div class="breadcrumb-custom mb-3">صفحه اصلی / محصولات / ${product.name}</div>
        <span class="badge-category mb-3">${product.category}</span>
        <h1 class="fw-black fw-bold mb-2">${product.name}</h1>
        <h3 class="price mb-4">${toman(product.price)}</h3>
        <p class="text-muted">${product.description}</p>
        <ul class="info-list">
          <li>وزن: ${product.weight}</li>
          <li>مناسب برای: ${product.people}</li>
          <li>زمان آماده‌سازی: ${product.prepare}</li>
          <li>شرایط نگهداری: ${product.storage}</li>
        </ul>
        <div class="d-grid gap-2">
          <a href="order.html?id=${product.id}" class="btn btn-primary-custom">ثبت سفارش</a>
          <a href="products.html" class="btn btn-outline-custom">بازگشت به محصولات</a>
        </div>
      </div>
    </div>
  `;

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const relatedContainer = document.getElementById("relatedProducts");
  if (relatedContainer) {
    relatedContainer.innerHTML = related.length ? related.map(productCard).join("") : products.slice(0, 3).map(productCard).join("");
  }
}

function setupOrderPage() {
  const form = document.getElementById("orderForm");
  const select = document.getElementById("orderProduct");
  if (!form || !select) return;

  select.innerHTML = `<option value="">انتخاب محصول</option>` + products.map((product) => `
    <option value="${product.id}" data-price="${product.price}">${product.name}</option>
  `).join("");

  const requestedId = readQueryParam("id");
  if (requestedId && products.some((product) => product.id === requestedId)) {
    select.value = requestedId;
  }

  const quantity = document.getElementById("orderQuantity");
  const summaryProduct = document.getElementById("summaryProduct");
  const summaryQty = document.getElementById("summaryQty");
  const summaryPrice = document.getElementById("summaryPrice");
  const summaryTotal = document.getElementById("summaryTotal");

  function updateSummary() {
    const product = products.find((item) => item.id === select.value);
    const qty = Math.max(1, Number(quantity.value || 1));
    summaryProduct.textContent = product ? product.name : "انتخاب نشده";
    summaryQty.textContent = qty.toLocaleString("fa-IR");
    summaryPrice.textContent = product ? toman(product.price) : "۰ تومان";
    summaryTotal.textContent = product ? toman(product.price * qty) : "۰ تومان";
  }

  select.addEventListener("change", updateSummary);
  quantity.addEventListener("input", updateSummary);
  updateSummary();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const phone = document.getElementById("orderPhone");
    const phoneRegex = /^09\d{9}$/;
    if (phone.value.trim() && !phoneRegex.test(phone.value.trim())) {
      phone.setCustomValidity("شماره موبایل باید با 09 شروع شود و 11 رقم باشد.");
    } else {
      phone.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");
    document.getElementById("orderSuccess").style.display = "block";
    form.reset();
    if (requestedId) select.value = requestedId;
    updateSummary();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupContactPage() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const contact = document.getElementById("contactWay");
    const value = contact.value.trim();
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !phoneRegex.test(value) && !emailRegex.test(value)) {
      contact.setCustomValidity("شماره موبایل یا ایمیل معتبر وارد کنید.");
    } else {
      contact.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");
    document.getElementById("contactSuccess").style.display = "block";
    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("عضویت شما با موفقیت ثبت شد.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavigation();
  renderFeaturedProducts();
  setupProductsPage();
  applyInitialProductSearch();
  setupHomeSearch();
  setupProductDetailsPage();
  setupOrderPage();
  setupContactPage();
  setupNewsletterForm();
});
