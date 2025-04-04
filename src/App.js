import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, TopBar} from "./pages/Home"; // Import Home and TopBar from the pages folder
import Product from "./pages/Product"; // Import Product component
import Cart from "./pages/Cart"; // Import Cart component
import About from "./pages/About"; // Import About component
import "./App.css"; //import global styles
import Footer from "./components/Footer"; //import footer
import { useState } from "react";
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="main-content">
        <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="content-wrapper">
          <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/browse" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;