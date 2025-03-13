import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Product</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;