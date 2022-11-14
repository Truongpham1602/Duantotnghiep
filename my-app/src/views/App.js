import { Routes, Route } from "react-router-dom";

import Admin from "../components/layout/Admin";
import Product from "../components/product/Product";
import WebsiteLayout from "../components/layout/WebsiteLayout";

import Home from "../pages/User/Home/Home";
import Cart from "../pages/User/Cart/Cart";
import Login from "../components/Login";

import "./App.scss";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route
          path="admin"
          element={
            <>
              {" "}
              <Admin />
            </>
          }
        >
          <Route
            path=""
            element={
              <>
                {" "}
                <Product />
              </>
            }
          />
          <Route
            path="product"
            element={
              <>
                {" "}
                <Product />
              </>
            }
          />
        </Route>
      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
