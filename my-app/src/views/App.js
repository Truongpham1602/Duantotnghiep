import './App.scss';
import Admin from '../components/layout/Admin';
import Home from '../components/layout/Home';
import Product from '../components/product/Product';

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
          <Route path="" element={<> <Product /></>} />
          <Route path="product" element={<> <Product /></>} />
        </Route>
      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
