import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletter = (e) => {
    e.preventDefault()
    alert('عضویت شما با موفقیت ثبت شد.')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5>شیرینی‌کده</h5>
            <p>وب‌سایت سفارش کیک و شیرینی</p>
          </div>
          <div className="col-md-2">
            <h6>دسترسی سریع</h6>
            <a href="/">صفحه اصلی</a>
            <a href="/products">محصولات</a>
            <a href="/order">ثبت سفارش</a>
          </div>
          <div className="col-md-3">
            <h6>ارتباط با ما</h6>
            <a href="tel:+982112345678">۰۲۱-۱۲۳۴۵۶۷۸</a>
            <a href="shirinahmadi12@gmail.com">shirinahmadi12@gmail.com</a>
            <span>تهران، میدان آزادی، خیابان آزادی</span>
          </div>
          <div className="col-md-3">
            <h6>خبرنامه</h6>
            <form onSubmit={handleNewsletter} className="d-flex gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="ایمیل شما"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="btn btn-primary-custom" type="submit">عضویت</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom text-center">تمامی حقوق این وب‌سایت محفوظ است</div>
      </div>
    </footer>
  )
}
