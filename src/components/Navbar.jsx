import { NavLink } from 'react-router-dom'

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <span className="brand-logo">🧁</span>
          <span>شیرینی‌کده</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainMenu"
          aria-controls="mainMenu"
          aria-expanded="false"
          aria-label="باز کردن منو"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className={navClass} to="/">صفحه اصلی</NavLink></li>
            <li className="nav-item"><NavLink className={navClass} to="/products">محصولات</NavLink></li>
            <li className="nav-item"><NavLink className={navClass} to="/order">ثبت سفارش</NavLink></li>
            <li className="nav-item"><NavLink className={navClass} to="/about">درباره ما</NavLink></li>
            <li className="nav-item"><NavLink className={navClass} to="/contact">تماس با ما</NavLink></li>
            <li className="nav-item"><NavLink className={navClass} to="/admin">مدیریت</NavLink></li>
          </ul>
          <NavLink to="/products" className="btn btn-outline-custom btn-sm">مشاهده محصولات</NavLink>
        </div>
      </div>
    </nav>
  )
}
