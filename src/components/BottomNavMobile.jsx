import { NavLink } from 'react-router-dom'

export default function BottomNavMobile() {
  const cls = ({ isActive }) => isActive ? 'active' : ''
  return (
    <div className="bottom-nav-mobile">
      <NavLink to="/" className={cls}><span>🏠</span>خانه</NavLink>
      <NavLink to="/products" className={cls}><span>🧁</span>محصولات</NavLink>
      <NavLink to="/order" className={cls}><span>📝</span>سفارش</NavLink>
      <NavLink to="/contact" className={cls}><span>☎️</span>تماس</NavLink>
    </div>
  )
}
