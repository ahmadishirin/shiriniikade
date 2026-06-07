import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNavMobile from './components/BottomNavMobile'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminDashboard from './pages/AdminDashboard'
import AdminEditProduct from './pages/AdminEditProduct'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
      </Routes>
      <Footer />
      <BottomNavMobile />
    </BrowserRouter>
  )
}
