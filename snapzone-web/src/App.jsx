import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import MyCart from "./components/MyCart"
import Checkout from "./components/Checkout"
const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/mycart" element={<MyCart />} /> {/* My Cart Page */}
        <Route path="/checkout" element={<Checkout />} /> {/* Checkout Page */}
      </Routes>
    </Router>
  );
};

export default App;