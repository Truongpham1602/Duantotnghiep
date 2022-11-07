import './App.scss';
import Admin from '../components/layout/admin/Admin';
import Home from '../components/layout/home/Home';
import Product from '../components/product/Product';
import User from '../components/user/User';
import Cart from '../components/layout/cart/CartPage';
import Bill from '../components/bill/Bill';
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
