import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, TopBar} from "./pages/Home"; // Import Home and TopBar from the pages folder
import Product from "./pages/Product"; // Import Product component
import Cart from "./pages/Cart"; // Import Cart component
import About from "./pages/About"; // Import About component

function App() {
  return (
    <Router>
       {/* Main content wrapper */}
       <div className="main-content">
      {/* Render TopBar at the top of the page */}
      <TopBar />
         {/* Content section where the different pages will render */}
         <div className="content-wrapper">
      {/* Define the routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/browse" element={<Product />} /> {/* Product page */}
        <Route path="/cart" element={<Cart />} /> {/* Cart page */}
        <Route path="/about" element={<About />} /> {/* About page */}
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
