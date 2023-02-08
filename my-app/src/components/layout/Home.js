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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { styleToast } from '../common/const';
import "react-toastify/dist/ReactToastify.css";
import useCallGetAPI from "../../customHook/CallGetApi";

const Home = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const [keyword, setKeyword] = useState('')
  const [cate_Id, setCate_Id] = useState(0)
  const [totalPage, setTotalPage] = useState([])
  const [pageNumber, setPageNumber] = useState()
  const [dataProduct, setDataProduct] = useState([]);
  const [dataUser, setDataUser] = useState({ fullName: "" });
  const [top3ProBill, setTop3ProBill] = useState([]);
  const [top5ProNew, setTop5ProNew] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let d3 = await axios.get(
          `http://localhost:8080/nofilter/product/findTop3Bill`
        );
        setTop3ProBill(d3.data);

        let d5 = await axios.get(
          `http://localhost:8080/nofilter/product/findTop5New`
        );
        setTop5ProNew(d5.data.reverse());
        if (token) {
          let user = await axios.get(`http://localhost:8080/auth/information`,
            { headers: { "Authorization": `Bearer ${token}` } }
          );
          setDataUser(user.data);
          const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
            { headers: { "Authorization": `Bearer ${token}` } })
          setCart(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, []);

  // clearUser(() => {
  //   setDataUser(null);
  // });

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

  useEffect(() => {
    searchButton()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token');
    setDataUser({})
    setCart([])
    navigate("/");
  }

  const handleInputSearch = async (e) => {
    if (e.target.value == 0) {
      setKeyword(e.target.value)
      let res = await axios.post(
        `http://localhost:8080/admin/product/searchClient?keyword=${keyword}`,
        { headers: { "Authorization": `Bearer ${token}` } })
      let data = res ? res.data : []
      if (data.totalPages > totalPage.length) {
        for (let i = 1; i <= data.totalPages; i++) {
          setTotalPage((prev) => [...prev, i])
        }
      }
      setDataProduct(data.content)
      setPageNumber(data.number)
    } else {
      setKeyword(e.target.value)
    }
  }

  const handleCate = async (cate_Id) => {
    setCate_Id(cate_Id)
    let res = await axios.post(`http://localhost:8080/nofilter/searchClient?keyword=${keyword}&cate_Id=${cate_Id}`)
    let data = res ? res.data : []
    setTotalPage([])
    for (let i = 1; i <= data.totalPages; i++) {
      setTotalPage((prev) => [...prev, i])
    }
    setDataProduct(data.content)
    setPageNumber(data.number)
  }

  const searchButton = async () => {

    let res = await axios.post(`http://localhost:8080/nofilter/searchClient?keyword=${keyword}&cate_Id=${cate_Id}`);
    let data = res ? res.data : []
    if (data.totalPages > totalPage.length) {
      for (let i = 1; i <= data.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])
      }
    }
    setDataProduct(data.content)
    setPageNumber(data.number)
  }



  const pageable = async (id) => {
    if (id <= 0) {
      id = 0
    } else if (id >= totalPage.length - 1) {
      id = totalPage.length - 1
    }
    const res = await axios.get(`http://localhost:8080/admin/product/searchClient?keyword=${keyword}&cate_Id=${cate_Id}&page=${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
    let data = res ? res.data : []
    setDataProduct(data.content)
    setPageNumber(data.number)
  }




  const nextProductDetail = async (id) => {
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    if (token) {
      const res = await axios.get(
        `http://localhost:8080/nofilter/find/${id}`, config
      );
      setProduct(res.data);
      navigate(`/productOne/${id}`);
    } else {
      navigate("/login");
    }
  };



  const addToCart = async (size_Id, quantity) => {
    if (size_Id == null) {
      toast.warning("Bạn chưa chọn size!", styleToast)
      return
    } else if (quantity <= 0) {
      toast.warning("Cần tối thiểu 1 sản phẩm để thêm vào giỏ hàng", styleToast)
      return
    }
    let user = null;
    if (token) {
      user = await axios.get(`http://localhost:8080/auth/information`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
    }

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
        if (res?.data) toast.success("Cập nhật giỏ hàng thành công", styleToast);
      } else {
        let res = await axios.post(`http://localhost:8080/cart/create`, {
          user_Id: user.data.id,
          size_Id: size_Id,
          quantity: quantity,
          status: 1
        },
          { headers: { "Authorization": `Bearer ${token}` } })
        if (res?.data) toast.success("Thêm vào giỏ hàng thành công", styleToast);
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
      <Header dataCart={cart} imageUrls={imageUrls} searchButton={searchButton}
        handleInputSearch={handleInputSearch} keyword={keyword}
        dataUser={dataUser} logOut={logOut}
      // clearUser={clearUser}
      />
      <Outlet context={[nextProductDetail, addToCart, product, dataProduct, pageable, searchButton, totalPage, setKeyword, handleCate, top3ProBill, top5ProNew]} />
      <Footer />
    </>
  );
};

export default Home;
