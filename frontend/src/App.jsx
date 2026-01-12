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
import ResetPassword from "./landing-page/authenticate/ResetPassword.jsx";
import Navbar from "./component/navbar.jsx";
import GlobalAlert from "./component/GlobalAlert.jsx";
import NotFound from "./component/NotFound.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Footer from "./component/footer.jsx";
import Success from "./landing-page/checkout/Success.jsx";
import CancelPage from "./landing-page/checkout/Cancel.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <GlobalAlert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productListing" element={<ProductListing />} />
          <Route path="/productDetail" element={<ProductrDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<CancelPage />} />
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
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
