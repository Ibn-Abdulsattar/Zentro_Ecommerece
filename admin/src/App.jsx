
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Customer from './pages/customers/customers';
import Orders from './pages/orders/orders';
import Payments from './pages/payments/payments';
import Products from './pages/products/products';
import Reports from './pages/reports/reports';
import Setting from './pages/setting/setting';
import { Box, Grid } from '@mui/system';

function App() {

  return (
    <Grid size={{md:9, xs:12}}>
    <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/customers' element={<Customer/>} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/Payments' element={<Payments/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/reports' element={<Reports/>} />
    <Route path='/setting' element={<Setting/>} />
    </Routes>
    </Grid>
  )
}

export default App
