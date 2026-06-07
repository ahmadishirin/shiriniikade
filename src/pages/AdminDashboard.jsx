import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct, getMessages, markMessageRead, getOrders } from '../services/api'

const isFallbackId = (id) => String(id).startsWith('f') && !isNaN(String(id).slice(1))

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [orders, setOrders] = useState([])
  const [loadingProds, setLoadingProds] = useState(true)
  const [loadingMsgs, setLoadingMsgs] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState('')

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoadingProds(false))
  }, [])

  useEffect(() => {
    if (tab === 'messages' && loadingMsgs) {
      getMessages()
        .then(data => setMessages(Array.isArray(data) ? data : []))
        .finally(() => setLoadingMsgs(false))
    }
    if (tab === 'orders' && loadingOrders) {
      getOrders()
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .finally(() => setLoadingOrders(false))
    }
  }, [tab])

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p._id !== id))
      setDeleteStatus('✅ محصول با موفقیت حذف شد.')
      setDeleteConfirm(null)
      setTimeout(() => setDeleteStatus(''), 3000)
    } catch (err) {
      setDeleteStatus('❌ ' + err.message)
    }
  }

  const handleMarkRead = async (id) => {
    await markMessageRead(id)
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m))
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>پنل مدیریت</h1>
          <p className="section-subtitle mb-0">مدیریت محصولات و پیام‌های تماس</p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          {deleteStatus && (
            <div className={`alert ${deleteStatus.startsWith('✅') ? 'alert-success' : 'alert-danger'} mb-4`}>
              {deleteStatus}
            </div>
          )}

          {/* تب‌ها */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link${tab === 'products' ? ' active fw-bold' : ''}`}
                onClick={() => setTab('products')}
              >
                🧁 محصولات ({products.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link${tab === 'orders' ? ' active fw-bold' : ''}`}
                onClick={() => setTab('orders')}
              >
                📝 سفارش‌ها ({orders.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link${tab === 'messages' ? ' active fw-bold' : ''}`}
                onClick={() => setTab('messages')}
              >
                📩 پیام‌های تماس
                {unreadCount > 0 && (
                  <span className="badge bg-danger me-1 ms-1">{unreadCount}</span>
                )}
              </button>
            </li>
          </ul>

          {/* تب محصولات */}
          {tab === 'products' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 fw-bold mb-0">لیست محصولات</h2>
                <Link to="/admin/add-product" className="btn btn-primary btn-sm">+ افزودن محصول</Link>
              </div>

              {loadingProds ? (
                <p className="text-muted">در حال بارگذاری...</p>
              ) : products.length === 0 ? (
                <p className="text-muted">محصولی یافت نشد.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>تصویر</th>
                        <th>نام محصول</th>
                        <th>دسته‌بندی</th>
                        <th>قیمت</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr key={p._id}>
                          <td className="text-muted small">{(i + 1).toLocaleString('fa-IR')}</td>
                          <td>
                            {p.image ? (
                              <img src={p.image} alt={p.title} width="40" height="40" style={{ objectFit: 'contain' }} />
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td className="fw-semibold">{p.title}</td>
                          <td><span className="badge bg-secondary">{p.category}</span></td>
                          <td>{Number(p.price).toLocaleString('fa-IR')} تومان</td>
                          <td>
                            {isFallbackId(p._id) ? (
                              <span className="text-muted small" title="داده پیش‌فرض — نیاز به اتصال DB">⚠️ offline</span>
                            ) : (
                              <>
                                <Link
                                  to={`/admin/edit-product/${p._id}`}
                                  className="btn btn-sm btn-outline-primary ms-2"
                                >
                                  ✏️ ویرایش
                                </Link>
                                {deleteConfirm === p._id ? (
                                  <>
                                    <button
                                      className="btn btn-sm btn-danger ms-1"
                                      onClick={() => handleDelete(p._id)}
                                    >
                                      تأیید حذف
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-secondary ms-1"
                                      onClick={() => setDeleteConfirm(null)}
                                    >
                                      انصراف
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => setDeleteConfirm(p._id)}
                                  >
                                    🗑️ حذف
                                  </button>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* تب پیام‌های تماس */}
          {tab === 'messages' && (
            <div>
              <h2 className="h5 fw-bold mb-3">پیام‌های تماس با ما</h2>

              {loadingMsgs ? (
                <p className="text-muted">در حال بارگذاری...</p>
              ) : messages.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: '2.5rem' }}>📭</div>
                  <p className="mt-2">هنوز پیامی دریافت نشده است.</p>
                </div>
              ) : (
                <div className="row g-3">
                  {messages.map(m => (
                    <div key={m._id} className="col-12">
                      <div className={`card border${m.read ? '' : ' border-primary'}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                              <span className="fw-bold ms-2">{m.name}</span>
                              <span className="text-muted small">{m.contact}</span>
                              {!m.read && <span className="badge bg-primary me-2">جدید</span>}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-secondary">{m.subject}</span>
                              <small className="text-muted">
                                {new Date(m.createdAt).toLocaleDateString('fa-IR')}
                              </small>
                              {!m.read && (
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleMarkRead(m._id)}
                                >
                                  علامت‌گذاری خوانده‌شده
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="mb-0 mt-2">{m.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* تب سفارش‌ها */}
          {tab === 'orders' && (
            <div>
              <h2 className="h5 fw-bold mb-3">سفارش‌های ثبت شده</h2>

              {loadingOrders ? (
                <p className="text-muted">در حال بارگذاری...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: '2.5rem' }}>📦</div>
                  <p className="mt-2">هنوز سفارشی ثبت نشده است.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>نام مشتری</th>
                        <th>شماره تماس</th>
                        <th>محصول</th>
                        <th>تعداد</th>
                        <th>جمع کل</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o, i) => {
                        const productTitle = o.productId?.title || 'نامشخص'
                        const productPrice = o.productId?.price || 0
                        const total = productPrice * (o.quantity || 1)
                        return (
                          <tr key={o._id}>
                            <td className="text-muted small">{(i + 1).toLocaleString('fa-IR')}</td>
                            <td className="fw-semibold">{o.fullName}</td>
                            <td><a href={`tel:${o.phone}`} className="text-decoration-none">{o.phone}</a></td>
                            <td>{productTitle}</td>
                            <td>{(o.quantity || 1).toLocaleString('fa-IR')}</td>
                            <td className="fw-semibold">
                              {total > 0 ? total.toLocaleString('fa-IR') + ' تومان' : '—'}
                            </td>
                            <td><span className="badge bg-warning text-dark">{o.status}</span></td>
                            <td><small className="text-muted">{new Date(o.createdAt).toLocaleDateString('fa-IR')}</small></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
