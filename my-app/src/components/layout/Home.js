import { React, useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  Navigate,
  useHistory,
  useNavigate,
} from "react-router-dom";
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

  useEffect(() => {
    if (dataCart && dataCart.length > 0) {
      setCart(dataCart);
    }
  }, [dataCart]);
  const navigate = useNavigate();

  const addToCart = async (size_Id) => {
    let res = await axios.post(`http://localhost:8080/cart/addToCart`, {
      size_Id: size_Id,
      quantity: 1,
    });
    let copydata = cart;
    copydata.unshift(res.data);
    setCart(copydata);
    navigate(window.location.pathname);
    toast.success("Add to cart success", styleToast);
  };

  const styleToast = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return (
    <>
      <ToastContainer />
      <Header dataCart={cart} />
      <Outlet context={[addToCart]} />
      <Footer />
    </>
  );
};

export default Home;
