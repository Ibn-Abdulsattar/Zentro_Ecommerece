import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './landing-page/home/Home'
import ProductListing from './landing-page/productListing/productListing'
import ProductrDetail from './landing-page/productDetail/ProductDetail'
import Checkout from './landing-page/checkout/Checkout'
import Authenticate from './landing-page/authenticate/authenticate'
import Profile from './landing-page/profile/profile'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/productListing' element={ <ProductListing/>} />
      <Route path='/productDetail' element={<ProductrDetail/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    </>
  )
}

export default App
