import { useState } from 'react'
import { createProduct } from '../services/api'

const CATEGORIES = ['کیک تولد', 'شیرینی خشک', 'شیرینی تر', 'دسر', 'محصولات مناسبتی']

const empty = { title: '', price: '', category: 'کیک تولد', description: '', image: '', weight: '', people: '', prepare: '', storage: '' }

export default function AdminAddProduct() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'نام محصول الزامی است.'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'قیمت باید عدد مثبت باشد.'
    if (!form.category) e.category = 'دسته‌بندی الزامی است.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')
    setSuccess('')
    try {
      const saved = await createProduct({ ...form, price: Number(form.price) })
      setSuccess(`✅ محصول "${saved.title}" با موفقیت اضافه شد.`)
      setForm(empty)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>افزودن محصول جدید</h1>
          <p className="section-subtitle mb-0">اطلاعات محصول جدید را وارد کنید تا در لیست محصولات نمایش داده شود.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {success && <div className="success-box mb-4">{success}</div>}
              {serverError && <div className="alert alert-danger mb-4">{serverError}</div>}

              <div className="form-card">
                <h2 className="h4 fw-bold mb-4">اطلاعات محصول</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">نام محصول *</label>
                      <input name="title" type="text" className={`form-control${errors.title ? ' is-invalid' : ''}`} placeholder="مثال: کیک شکلاتی" value={form.title} onChange={handleChange} />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">قیمت (تومان) *</label>
                      <input name="price" type="number" className={`form-control${errors.price ? ' is-invalid' : ''}`} placeholder="مثال: 450000" value={form.price} onChange={handleChange} />
                      {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">دسته‌بندی *</label>
                      <select name="category" className={`form-select${errors.category ? ' is-invalid' : ''}`} value={form.category} onChange={handleChange}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">آدرس تصویر</label>
                      <input name="image" type="text" className="form-control" placeholder="مثال: /img/my-cake.svg" value={form.image} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">توضیح کوتاه</label>
                      <textarea name="description" className="form-control" rows="3" placeholder="توضیح مختصر درباره محصول" value={form.description} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">وزن</label>
                      <input name="weight" type="text" className="form-control" placeholder="مثال: ۱ کیلوگرم" value={form.weight} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">مناسب برای</label>
                      <input name="people" type="text" className="form-control" placeholder="مثال: ۶ تا ۸ نفر" value={form.people} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">زمان آماده‌سازی</label>
                      <input name="prepare" type="text" className="form-control" placeholder="مثال: ۲۴ ساعت" value={form.prepare} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">شرایط نگهداری</label>
                      <input name="storage" type="text" className="form-control" placeholder="مثال: در یخچال نگهداری شود" value={form.storage} onChange={handleChange} />
                    </div>
                    <div className="col-12 d-grid">
                      <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                        {loading ? 'در حال ذخیره...' : 'افزودن محصول'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
