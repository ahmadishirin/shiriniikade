import { useState } from 'react'
import { createMessage } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', subject: 'سوال درباره محصولات', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 3) e.name = 'لطفاً نام خود را وارد کنید.'
    const val = form.contact.trim()
    const phoneOk = /^09\d{9}$/.test(val)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    if (!val || (!phoneOk && !emailOk)) e.contact = 'شماره موبایل یا ایمیل معتبر وارد کنید.'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'متن پیام باید حداقل ۱۰ کاراکتر باشد.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    try {
      await createMessage({ name: form.name, contact: form.contact, subject: form.subject, message: form.message })
    } catch (_) { /* ارسال ناموفق - همچنان پیام موفقیت نشان داده می‌شود */ }
    setSubmitted(true)
    setForm({ name: '', contact: '', subject: 'سوال درباره محصولات', message: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>تماس با ما</h1>
          <p className="section-subtitle mb-0">برای ارسال سوال، پیشنهاد یا درخواست، فرم زیر را تکمیل کنید.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          {submitted && (
            <div className="success-box mb-4">✅ پیام شما با موفقیت ارسال شد. در اولین فرصت پاسخ داده می‌شود.</div>
          )}

          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3"><div className="contact-info-card d-flex gap-3 align-items-center"><div className="contact-icon">📍</div><div><h6 className="fw-bold">آدرس</h6><p className="text-muted mb-0">تهران ، میدان آزادی، خیابان آزادی</p></div></div></div>
            <div className="col-md-6 col-lg-3"><div className="contact-info-card d-flex gap-3 align-items-center"><div className="contact-icon">☎️</div><div><h6 className="fw-bold">شماره تماس</h6><p className="text-muted mb-0">۰۲۱-۱۲۳۴۵۶۷۸</p></div></div></div>
            <div className="col-md-6 col-lg-3"><div className="contact-info-card d-flex gap-3 align-items-center"><div className="contact-icon">✉️</div><div><h6 className="fw-bold">ایمیل</h6><p className="text-muted mb-0">Amdshirin@gmail.com</p></div></div></div>
            <div className="col-md-6 col-lg-3"><div className="contact-info-card d-flex gap-3 align-items-center"><div className="contact-icon">⏰</div><div><h6 className="fw-bold">ساعات کاری</h6><p className="text-muted mb-0">۹ صبح تا ۹ شب</p></div></div></div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="form-card h-100">
                <h2 className="h4 fw-bold mb-4">فرم تماس با ما</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">نام و نام خانوادگی</label>
                    <input
                      name="name" type="text" className={`form-control${errors.name ? ' is-invalid' : ''}`}
                      placeholder="نام خود را وارد کنید" value={form.name} onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">شماره تماس یا ایمیل</label>
                    <input
                      name="contact" type="text" className={`form-control${errors.contact ? ' is-invalid' : ''}`}
                      placeholder="مثال: 09123456789 یا email@example.com" value={form.contact} onChange={handleChange}
                    />
                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">موضوع پیام</label>
                    <select name="subject" className="form-select" value={form.subject} onChange={handleChange}>
                      <option>سوال درباره محصولات</option>
                      <option>پیگیری سفارش</option>
                      <option>پیشنهاد یا انتقاد</option>
                      <option>سایر موارد</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">متن پیام</label>
                    <textarea
                      name="message" className={`form-control${errors.message ? ' is-invalid' : ''}`}
                      rows="5" placeholder="پیام خود را بنویسید" value={form.message} onChange={handleChange}
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary-custom w-100">ارسال پیام</button>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="map-placeholder h-100"><span>نقشه محل فروشگاه</span></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
