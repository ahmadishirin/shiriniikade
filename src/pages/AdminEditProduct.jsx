import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct } from '../services/api'

const CATEGORIES = ['کیک تولد', 'شیرینی خشک', 'شیرینی تر', 'دسر', 'محصولات مناسبتی']

const isFallbackId = (id) => String(id).startsWith('f') && !isNaN(String(id).slice(1))

export default function AdminEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    getProduct(id)
      .then(p => setForm({
        title: p.title || '',
        price: p.price || '',
        category: p.category || 'کیک تولد',
        description: p.description || '',
        image: p.image || '',
        weight: p.weight || '',
        people: p.people || '',
        prepare: p.prepare || '',
        storage: p.storage || ''
      }))
      .catch(() => setServerError('محصول یافت نشد.'))
      .finally(() => setFetching(false))
  }, [id])

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
      await updateProduct(id, { ...form, price: Number(form.price) })
      setSuccess('✅ محصول با موفقیت ویرایش شد.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => navigate('/admin'), 1500)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <main className="section-padding"><div className="container"><p>در حال بارگذاری...</p></div></main>
  if (!form) return <main className="section-padding"><div className="container"><p className="text-danger">{serverError}</p></div></main>

  const isReadonly = isFallbackId(id)

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>ویرایش محصول</h1>
          <p className="section-subtitle mb-0">اطلاعات محصول را ویرایش کنید.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {success && <div className="success-box mb-4">{success}</div>}
              {serverError && <div className="alert alert-danger mb-4">{serverError}</div>}

              <div className="form-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h4 fw-bold mb-0">اطلاعات محصول</h2>
                  <button onClick={() => navigate('/admin')} className="btn btn-sm btn-outline-secondary">
                    ← بازگشت به مدیریت
                  </button>
                </div>
                {isReadonly && (
                  <div className="alert alert-warning mb-4">
                    ⚠️ این محصول از داده‌های پیش‌فرض (offline) بارگذاری شده و در پایگاه داده ذخیره نشده است. برای ویرایش، ابتدا باید اتصال به MongoDB برقرار باشد.
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">نام محصول *</label>
                      <input name="title" type="text" className={`form-control${errors.title ? ' is-invalid' : ''}`} value={form.title} onChange={handleChange} />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">قیمت (تومان) *</label>
                      <input name="price" type="number" className={`form-control${errors.price ? ' is-invalid' : ''}`} value={form.price} onChange={handleChange} />
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
                      <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} />
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
                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled={loading || isReadonly}>
                        {loading ? 'در حال ذخیره...' : '💾 ذخیره تغییرات'}
                      </button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
                        انصراف
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
