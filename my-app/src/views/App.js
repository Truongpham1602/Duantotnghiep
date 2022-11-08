import './App.scss';
import Admin from '../components/layout/Admin';
import Home from '../components/layout/Home'
import Product from '../components/product/Product';

import User from '../components/user/User';
import Cart from '../components/layout/CartPage';
import Bill from '../components/bill/Bill';

import Product1 from '../components/layout/Product';
import HeaderPage from '../components/layout/HeaderPage';
import ProductTest from '../components/HOME/ProductTest';
import ProductList from '../components/HOME/ProductList';

import ProductOne from '../components/HOME/ProductOne';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Routes>
        <Route path="/" element={<Home />} >

          {/* <Route path="cart" element={<> <Cart /></>} /> */}

          <Route path="" element={<> <HeaderPage /><ProductTest /><ProductList /></>} />
          <Route path="shop" element={<> <Product1 /></>}>
            <Route path="" element={<> <ProductTest /></>} />
          </Route>
          <Route path="ProductOne" element={<> <ProductOne /></>}></Route>

        </Route>
        <Route path="admin" element={<> <Admin /></>} >
          <Route path="" element={<> <Product /><User /></>} />
          <Route path="product" element={<> <Product /></>} />
          <Route path="user" element={<> <User /></>} />
        </Route>
        <Route path="cart" element={<Cart />} >

        </Route>
        <Route path="checkout" element={<Bill />} >

        </Route>
      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
