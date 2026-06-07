import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProduct, getProducts } from '../services/api'

const toman = (v) => Number(v).toLocaleString('fa-IR') + ' تومان'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getProduct(id)
      .then(p => {
        setProduct(p)
        document.title = `${p.title} | شیرینی‌کده`
        return getProducts()
      })
      .then(all => {
        setRelated(
          Array.isArray(all)
            ? all.filter(p => p.category === product?.category && p._id !== id).slice(0, 3)
            : []
        )
        setLoading(false)
      })
      .catch(() => { setError('محصول یافت نشد.'); setLoading(false) })
  }, [id])

  useEffect(() => {
    if (product) {
      getProducts().then(all => {
        setRelated(
          Array.isArray(all)
            ? all.filter(p => p.category === product.category && p._id !== id).slice(0, 3)
            : []
        )
      })
    }
  }, [product])

  if (loading) return <div className="section-padding text-center text-muted">در حال بارگذاری...</div>
  if (error || !product) return <div className="section-padding text-center text-muted">{error || 'محصول یافت نشد'}</div>

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>جزئیات محصول</h1>
          <p className="section-subtitle mb-0">اطلاعات کامل محصول انتخابی را مشاهده کنید و سپس سفارش خود را ثبت نمایید.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <div className="detail-gallery-main">
                <img src={product.image} className="detail-main-img" alt={product.title} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="product-info-box h-100">
                <div className="breadcrumb-custom mb-3">صفحه اصلی / محصولات / {product.title}</div>
                <span className="badge-category mb-3">{product.category}</span>
                <h1 className="fw-bold mb-2">{product.title}</h1>
                <h3 className="price mb-4">{toman(product.price)}</h3>
                <p className="text-muted">{product.description}</p>
                <ul className="info-list">
                  {product.weight && <li>وزن: {product.weight}</li>}
                  {product.people && <li>مناسب برای: {product.people}</li>}
                  {product.prepare && <li>زمان آماده‌سازی: {product.prepare}</li>}
                  {product.storage && <li>شرایط نگهداری: {product.storage}</li>}
                </ul>
                <div className="d-grid gap-2">
                  <Link to={`/order?id=${product._id}`} className="btn btn-primary-custom">ثبت سفارش</Link>
                  <Link to="/products" className="btn btn-outline-custom">بازگشت به محصولات</Link>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-bold mb-0">محصولات مرتبط</h2>
              <Link to="/products" className="btn btn-outline-custom btn-sm">مشاهده همه</Link>
            </div>
            <div className="row g-4">
              {related.length > 0
                ? related.map(p => <ProductCard key={p._id} product={p} />)
                : <div className="col-12 text-muted">محصول مرتبطی یافت نشد.</div>
              }
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
