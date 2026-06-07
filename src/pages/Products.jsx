import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('همه محصولات')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearchQuery(q)
  }, [searchParams])

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    return ['همه محصولات', ...new Set(products.map(p => p.category))]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'همه محصولات' || p.category === activeCategory
      const q = searchQuery.trim().toLowerCase()
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [products, activeCategory, searchQuery])

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>محصولات شیرینی‌کده</h1>
          <p className="section-subtitle mb-0">محصول مورد نظر خود را جستجو یا بر اساس دسته‌بندی فیلتر کنید.</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className="row g-4">
            <aside className="col-lg-3">
              <div className="filter-panel">
                <h5 className="fw-bold mb-3">جستجو</h5>
                <input
                  type="search"
                  className="form-control mb-4"
                  placeholder="جستجو در محصولات..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />

                <div className="d-lg-none mb-3">
                  <label className="form-label">دسته‌بندی محصولات</label>
                  <select
                    className="form-select"
                    value={activeCategory}
                    onChange={e => setActiveCategory(e.target.value)}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="d-none d-lg-block">
                  <h5 className="fw-bold mb-3">دسته‌بندی</h5>
                  {categories.map(c => (
                    <button
                      key={c}
                      className={`category-btn${activeCategory === c ? ' active' : ''}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <section className="col-lg-9">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div>
                  <h2 className="h4 fw-bold mb-1">لیست محصولات</h2>
                  <p className="text-muted mb-0">
                    {loading ? 'در حال بارگذاری...' : `${filtered.length.toLocaleString('fa-IR')} محصول یافت شد`}
                  </p>
                </div>
                <Link to="/order" className="btn btn-primary-custom">ثبت سفارش سریع</Link>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="row g-4">
                {loading ? (
                  <div className="col-12 text-center text-muted py-5">در حال بارگذاری...</div>
                ) : filtered.length === 0 ? (
                  <div className="col-12">
                    <div className="empty-state">
                      <h5 className="fw-bold mb-2">محصولی یافت نشد</h5>
                      <p className="mb-0">عبارت جستجو یا دسته‌بندی انتخاب‌شده را تغییر دهید.</p>
                    </div>
                  </div>
                ) : filtered.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
