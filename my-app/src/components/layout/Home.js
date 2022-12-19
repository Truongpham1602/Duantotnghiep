import { React, useState, useEffect } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";

import Header from "../HOME/header";
import Footer from "../HOME/Footer";
import useCallGetAPI from "../../customHook/CallGetApi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { data: dataCart } = useCallGetAPI(
    `http://localhost:8080/cart/getCart?user_Id=`
  );
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (dataCart && dataCart.length > 0) {
      setCart(dataCart);
    }
  }, [dataCart]);

  const nextProductDetail = async (id) => {
    const res = await axios.get(
      `http://localhost:8080/admin/product/find/${id}`
    );
    setProduct(res.data);
    navigate("/productOne");
  };
  const addToCart = async (size_Id, quantity) => {
    if (size_Id == null) {
      toast.warning("Chưa chọn size!")
      return
    }
    let res = await axios.post(`http://localhost:8080/cart/addToCart`, {
      size_Id: size_Id,
      quantity: quantity,
    });
    // let copydata = cart
    // copydata.unshift(res.data);
    setCart(res.data);
    navigate(window.location.pathname);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  return (
    <>
      <ToastContainer />
      <Header dataCart={cart} />
      <Outlet context={[nextProductDetail, addToCart, product]} />
      <Footer />
    </>
  );
};

export default Home;
