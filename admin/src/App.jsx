
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Customers from './pages/customers/customers';
import Orders from './pages/orders/orders';
import Payments from './pages/payments/payments';
import Products from './pages/products/products';
import Setting from './pages/setting/setting';
import { Analytics } from './pages/analytics/analytics';

function App() {

  return (
    <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/customers' element={<Customers/>} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/payments' element={<Payments/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/setting' element={<Setting/>} />
    <Route path='/analytics' element={<Analytics/>} />
    </Routes>
  )
}

export default App
