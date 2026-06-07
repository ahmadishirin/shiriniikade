import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, createOrder } from '../services/api'

const toman = (v) => Number(v).toLocaleString('fa-IR') + ' تومان'

export default function Order() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ fullName: '', phone: '', productId: '', quantity: 1, address: '', description: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    getProducts().then(data => {
      if (Array.isArray(data)) {
        setProducts(data)
        const requestedId = searchParams.get('id')
        if (requestedId && data.some(p => p._id === requestedId)) {
          setForm(f => ({ ...f, productId: requestedId }))
        }
      }
    })
  }, [])

  const selectedProduct = products.find(p => p._id === form.productId)
  const total = selectedProduct ? selectedProduct.price * (form.quantity || 1) : 0

  const validate = () => {
    const e = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 3) e.fullName = 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.'
    if (!/^09\d{9}$/.test(form.phone.trim())) e.phone = 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.'
    if (!form.productId) e.productId = 'لطفاً محصول مورد نظر را انتخاب کنید.'
    if (!form.address.trim() || form.address.trim().length < 10) e.address = 'آدرس باید حداقل ۱۰ کاراکتر باشد.'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')
    try {
      const result = await createOrder({ ...form, quantity: Number(form.quantity) })
      // ذخیره در localStorage (چه آنلاین چه آفلاین)
      const saved = JSON.parse(localStorage.getItem('shirini_orders') || '[]')
      saved.push({ ...form, quantity: Number(form.quantity), date: new Date().toISOString(), offline: !!result.offline })
      localStorage.setItem('shirini_orders', JSON.stringify(saved))
      setSubmitted(result.offline ? 'offline' : 'online')
      setForm({ fullName: '', phone: '', productId: '', quantity: 1, address: '', description: '' })
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
          <h1>ثبت سفارش</h1>
          <p className="section-subtitle mb-0">فرم زیر را با اطلاعات صحیح تکمیل کنید تا سفارش شما ثبت شود.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          {submitted === 'online' && (
            <div className="success-box mb-4">✅ سفارش شما با موفقیت ثبت شد. کارشناسان ما برای هماهنگی با شما تماس خواهند گرفت.</div>
          )}
          {submitted === 'offline' && (
            <div className="alert alert-warning mb-4">
              📋 سفارش شما دریافت شد و ثبت موقت گردید. به دلیل اختلال موقت در سرور، کارشناسان ما از طریق شماره تماس شما پیگیری خواهند کرد.
            </div>
          )}
          {serverError && <div className="alert alert-danger mb-4">{serverError}</div>}

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="form-card">
                <h2 className="h4 fw-bold mb-4">اطلاعات سفارش</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">نام و نام خانوادگی</label>
                      <input
                        name="fullName" type="text" className={`form-control${errors.fullName ? ' is-invalid' : ''}`}
                        placeholder="مثال: مریم احمدی" value={form.fullName} onChange={handleChange}
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">شماره تماس</label>
                      <input
                        name="phone" type="tel" className={`form-control${errors.phone ? ' is-invalid' : ''}`}
                        placeholder="مثال: 09123456789" value={form.phone} onChange={handleChange}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">آدرس</label>
                      <textarea
                        name="address" className={`form-control${errors.address ? ' is-invalid' : ''}`}
                        rows="3" placeholder="آدرس کامل خود را وارد کنید"
                        value={form.address} onChange={handleChange}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="col-md-8">
                      <label className="form-label">محصول</label>
                      <select
                        name="productId" className={`form-select${errors.productId ? ' is-invalid' : ''}`}
                        value={form.productId} onChange={handleChange}
                      >
                        <option value="">انتخاب محصول</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                      </select>
                      {errors.productId && <div className="invalid-feedback">{errors.productId}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">تعداد</label>
                      <input
                        name="quantity" type="number" className="form-control"
                        min="1" value={form.quantity} onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">توضیحات سفارش</label>
                      <textarea
                        name="description" className="form-control" rows="4"
                        placeholder="متن روی کیک، زمان تحویل یا توضیحات تکمیلی"
                        value={form.description} onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 d-grid">
                      <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                        {loading ? 'در حال ارسال...' : 'ارسال سفارش'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="summary-card sticky-lg-top" style={{ top: '100px' }}>
                <h3 className="h5 fw-bold mb-3">خلاصه سفارش</h3>
                <div className="summary-row"><span>محصول</span><strong>{selectedProduct ? selectedProduct.title : 'انتخاب نشده'}</strong></div>
                <div className="summary-row"><span>تعداد</span><strong>{Number(form.quantity).toLocaleString('fa-IR')}</strong></div>
                <div className="summary-row"><span>قیمت واحد</span><strong>{selectedProduct ? toman(selectedProduct.price) : '۰ تومان'}</strong></div>
                <div className="summary-row border-0"><span>جمع کل</span><strong className="price">{toman(total)}</strong></div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
