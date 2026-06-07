import { Link } from 'react-router-dom'

const toman = (v) => Number(v).toLocaleString('fa-IR') + ' تومان'

export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="product-card">
        <Link to={`/products/${product._id}`} aria-label={`مشاهده جزئیات ${product.title}`}>
          <img src={product.image} className="product-img" alt={product.title} />
        </Link>
        <div className="card-body">
          <span className="badge-category mb-2">{product.category}</span>
          <h5 className="fw-bold mt-2">{product.title}</h5>
          <p className="text-muted small mb-3">{product.description}</p>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <span className="price">{toman(product.price)}</span>
            <Link className="btn btn-outline-custom btn-sm" to={`/products/${product._id}`}>مشاهده جزئیات</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
