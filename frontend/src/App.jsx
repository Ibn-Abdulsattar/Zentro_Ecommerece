import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './landing-page/home/Home';
import ProductListing from './landing-page/productListing/productListing';
import ProductrDetail from './landing-page/productDetail/ProductDetail';
import Checkout from './landing-page/checkout/Checkout';
import Authenticate from './landing-page/authenticate/authenticate';
import Profile from './landing-page/profile/profile';
import About from './landing-page/company/about';
import Contact from './landing-page/company/contact';
import HelpCenter from './landing-page/company/helpCenter';
import Privacy from './landing-page/company/privacy';
import Return from './landing-page/company/return';
import Shipping from './landing-page/company/shipping';
import Terms from './landing-page/company/terms';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/productListing' element={ <ProductListing/>} />
      <Route path='/productDetail' element={<ProductrDetail/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/helpCenter' element={<HelpCenter/>} />
      <Route path='/privacy' element={<Privacy/>} />
      <Route path='/return' element={<Return/>} />
      <Route path='/shipping' element={<Shipping/>} />
      <Route path='/terms' element={<Terms/>} />
    </Routes>
    </>
  )
}

export default App
