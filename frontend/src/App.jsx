import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./landing-page/home/Home";
import ProductListing from "./landing-page/productListing/productListing";
import ProductrDetail from "./landing-page/productDetail/ProductDetail";
import Checkout from "./landing-page/checkout/Checkout";
import Profile from "./landing-page/profile/profile";
import About from "./landing-page/company/about";
import Contact from "./landing-page/company/contact";
import HelpCenter from "./landing-page/company/helpCenter";
import Privacy from "./landing-page/company/privacy";
import Return from "./landing-page/company/return";
import Shipping from "./landing-page/company/shipping";
import Terms from "./landing-page/company/terms";
import Dashboard from "./landing-page/dashboard/Dashboard";
import Account from "./landing-page/account/Account";
import { AuthProvider } from "./landing-page/AuthContext";
import NotFound from "./landing-page/NotFound";
import Navbar from "./landing-page/navbar.jsx";
import Footer from "./landing-page/footer.jsx";
import GlobalAlert from "./landing-page/GlobalAlert.jsx";
import ResetPassword from "./landing-page/authenticate/ResetPassword.jsx";


function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <GlobalAlert/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productListing" element={<ProductListing />} />
          <Route path="/productDetail" element={<ProductrDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/helpCenter" element={<HelpCenter />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
