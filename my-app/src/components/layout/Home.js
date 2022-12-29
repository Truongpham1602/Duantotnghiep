import { React, useState, useEffect } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import Header from "../HOME/header";
import Footer from "../HOME/Footer";
import useCallGetAPI from "../../customHook/CallGetApi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const token = localStorage.getItem('token');
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");

  useEffect(() => {
    const getData = async () => {
      try {
        let user = await axios.get(`http://localhost:8080/auth/information`,
          { headers: { "Authorization": `Bearer ${token}` } }
        );
        const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
          { headers: { "Authorization": `Bearer ${token}` } })
        setCart(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, []);

  useEffect(() => {
    setImageUrls([])
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        let nameImg = item.name;
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    });
  }, [])

  const nextProductDetail = async (id) => {
    const res = await axios.get(
      `http://localhost:8080/admin/product/find/${id}`,
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    setProduct(res.data);
    navigate("/productOne");
  };
  const addToCart = async (size_Id, quantity) => {
    if (size_Id == null) {
      toast.warning("Chưa chọn size!")
      return
    }
    let user = await axios.get(`http://localhost:8080/auth/information`,
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    if (user?.data) {
      let cart_Id;
      let size_Cart;
      let check = false;
      let quantityCart;
      cart.map(item => {
        if (item.size_Id == size_Id) {
          cart_Id = item.id
          size_Cart = item.size_Id
          quantityCart = item.quantity
          check = true
        }
      })
      if (check) {
        let res = await axios.post(`http://localhost:8080/cart/update?id=${cart_Id}`, {
          quantity: quantity + quantityCart,
          size_Id: size_Cart
        },
          { headers: { "Authorization": `Bearer ${token}` } })
        if (res?.data) toast.success("Cập nhật giỏ hàng thành công");
      } else {
        let res = await axios.post(`http://localhost:8080/cart/create`, {
          user_Id: user.data.id,
          size_Id: size_Id,
          quantity: quantity,
          status: 1
        },
          { headers: { "Authorization": `Bearer ${token}` } })
        if (res?.data) toast.success("Thêm vào giỏ hàng thành công");
      }
      const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
        { headers: { "Authorization": `Bearer ${token}` } });
      setCart(res.data);
    } else {
      let res = await axios.post(`http://localhost:8080/cart/addToCart`, {
        size_Id: size_Id,
        quantity: quantity,
      },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      setCart(res.data);
    }
    // let copydata = cart
    // copydata.unshift(res.data);
    navigate(window.location.pathname);
  };
  return (
    <>
      <ToastContainer />
      <Header dataCart={cart} imageUrls={imageUrls} />
      <Outlet context={[nextProductDetail, addToCart, product]} />
      <Footer />
    </>
  );
};

export default Home;
