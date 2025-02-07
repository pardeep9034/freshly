import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Products from './Pages/Product';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import LoginPage from './components/user/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { CartProvider } from './utils/GeneralContext';
import Orders from './Pages/Orders';




// A wrapper component for conditional rendering based on location
const AppContent = () => {
  const location = useLocation();

  // Check if the current route matches "/Dashboard"
  const hideNavbarFooter = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {!hideNavbarFooter && <Navbar />}
      
      {/* Main content area */}
      <main className="flex-grow bg-surface">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
      <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
