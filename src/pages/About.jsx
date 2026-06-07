import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>درباره شیرینی‌کده</h1>
          <p className="section-subtitle mb-0"></p>
        </div>
      </header>

      <main>
        <section className="section-padding">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <img src="https://www.homebakersassociationofindia.com/images/hero-main.jpg" className="about-hero-img w-100" alt="تیم شیرینی‌کده" />
              </div>
              <div className="col-lg-6">
                <span className="badge-category mb-3">درباره ما</span>
                <h2 className="section-title">شیرینی تازه برای لحظه‌های شیرین</h2>
                <p className="text-muted">در شیرینی‌کده، ما با عشق و دقت بهترین شیرینی‌ها و دسرها را برای لحظات شیرین شما آماده می‌کنیم. هدف ما ارائه محصولاتی تازه، باکیفیت و خوش‌طعم است که با استفاده از مواد اولیه مرغوب تهیه شده و تجربه‌ای دلپذیر را برای مشتریان رقم بزند.</p>
                <p className="text-muted">از شیرینی‌های سنتی گرفته تا دسرهای مدرن و کیک‌های مناسبتی، تلاش می‌کنیم تا پاسخگوی سلیقه‌های مختلف باشیم. رضایت مشتریان، کیفیت محصولات و توجه به جزئیات، ارزش‌هایی هستند که شیرینی‌کده بر پایه آن‌ها شکل گرفته و هر روز برای حفظ آن‌ها تلاش می‌کند.</p>
                <Link to="/products" className="btn btn-primary-custom mt-2">مشاهده محصولات</Link>
              </div>
            </div>
          </div>
        </section>

        

        <section className="section-padding">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4"><div className="summary-card"><h4 className="fw-bold">طعم خانگی</h4><p className="text-muted mb-0">شیرینی های دست ساز با طعم اصیل</p></div></div>
              <div className="col-lg-4"><div className="summary-card"><h4 className="fw-bold">تازه و روزانه</h4><p className="text-muted mb-0">شیرینی ها هر روز با مواد تازه پخت می شوند</p></div></div>
              <div className="col-lg-4"><div className="summary-card"><h4 className="fw-bold">ارسال سریع</h4><p className="text-muted mb-0">تحویل به موقع و مطمئن درب منزل</p></div></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
