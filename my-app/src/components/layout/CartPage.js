import { React, useState, useEffect } from 'react';
import NumericInput from 'react-numeric-input';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "../css/CartPage.css";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import axios from 'axios';
import useCallGetAPI from "../../customHook/CallGetApi";
import { async } from '@firebase/util';

const Cart = () => {
    const token = localStorage.getItem('token');
    const [lstproduct, setLstProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState()
    const [lstcart, setLstCart] = useState([])
    const [source, setSource] = useState()
    const [number, setNumber] = useState({})
    const [imageUrls, setImageUrls] = useState([]);
    const navigate = useNavigate()
    const imagesListRef = ref(storage, "images/");
    const sizes = [{
        title: 36,
        status: false,
        selected: false
    },
    {
        title: 37,
        status: false,
        selected: false
    },
    {
        title: 38,
        status: false,
        selected: false
    },
    {
        title: 39,
        status: false,
        selected: false
    },
    {
        title: 40,
        status: false,
        selected: false
    },
    {
        title: 41,
        status: false,
        selected: false
    },
    {
        title: 42,
        status: false,
        selected: false
    },
    {
        title: 43,
        status: false,
        selected: false
    },
    {
        title: 44,
        status: false,
        selected: false
    },
    {
        title: 45,
        status: false,
        selected: false
    },
    {
        title: 46,
        status: false,
        selected: false
    }]

    const setDataLstCart = (data) => {
        let total = 0;
        setLstCart([])
        data.map(item => {
            let copydata = [...sizes];
            item.size.map(itemSize => {
                let getIndex = copydata.findIndex((p) => { return p.title == itemSize.size });
                let size = { id: itemSize.id, title: itemSize.size, quantity: itemSize.quantity, status: true, selected: false }
                copydata.fill(size, getIndex, getIndex + 1);
            })
            let index = copydata.findIndex((p) => { return p.id == item.size_Id });
            let sizeSelect = copydata.find((p) => { return p.id == item.size_Id });
            sizeSelect['selected'] = true
            copydata.fill(sizeSelect, index, index + 1);
            item['size'] = copydata
            setLstCart((prev) => [...prev, item])
        })
        const setTotal = () => {
            data.map(item => {
                total += item.price * item.quantity
            })
            setTotalPrice(total)
        }
        data && setTotal()
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let user = await axios.get(`http://localhost:8080/auth/information`,
                    { headers: { "Authorization": `Bearer ${token}` } }
                );
                const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setDataLstCart(res.data)
            } catch (error) {
                const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setDataLstCart(res.data)
            }
        }
        getData()
    }, [])

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

    const styleToast = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    const updateSize = async (cart_Id, pro_Id, size_Id) => {
        let user = await axios.get(`http://localhost:8080/auth/information`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        if (user?.data) {
            let quantityCart;
            lstcart.map(item => {
                if (item.id == cart_Id) {
                    quantityCart = item.quantity
                }
            })
            await axios.post(`http://localhost:8080/cart/update?id=${cart_Id}`, {
                quantity: quantityCart,
                size_Id: size_Id
            },
                { headers: { "Authorization": `Bearer ${token}` } })
            const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
                { headers: { "Authorization": `Bearer ${token}` } });
            setDataLstCart(res.data)
        } else {
            const res = await axios.get(`http://localhost:8080/cart/updateSizeNoUser/${pro_Id}?size_Id=${size_Id}`, { headers: { "Authorization": `Bearer ${token}` } })
            setDataLstCart(res.data)
        }
    }

    const updateQuantity = async (cart_Id, pro_Id, quantity, totalQuantitySize) => {
        if (quantity > totalQuantitySize) {
            toast.warning('Lớn hơn số lượng đang có', styleToast)
            return
        }
        let user = await axios.get(`http://localhost:8080/auth/information`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        if (user?.data) {
            let size_Id
            lstcart.map(item => {
                if (item.id == cart_Id) {
                    size_Id = item.size_Id
                }
            })
            await axios.post(`http://localhost:8080/cart/update?id=${cart_Id}`, {
                quantity: quantity,
                size_Id: size_Id
            },
                { headers: { "Authorization": `Bearer ${token}` } })
            const res = await axios.get(`http://localhost:8080/cart/getCart?user_Id=${user.data.id}`,
                { headers: { "Authorization": `Bearer ${token}` } });
            setDataLstCart(res.data)
        } else {
            const res = await axios.get(`http://localhost:8080/cart/updateQuantityNoUser/${pro_Id}?quantity=${quantity}`, { headers: { "Authorization": `Bearer ${token}` } })
            setDataLstCart(res.data)
        }
    }

    const handleOnchangeInput = (e, id) => {
        let copyNumber = number
        copyNumber[id] = e
        setNumber(copyNumber)
    }

    const nextToPayment = () => {
        if (lstcart.length <= 0) {
            toast.warning('Chưa có sản phẩm trong giỏ hàng', styleToast)
            return
        }
        navigate('/checkout')
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <h4 className="py-4">Shopping Cart</h4>
                <div className="d-flex justify-content-between align-items-center">
                    <ul className="breadcrumb">
                        <Link className="breadcrumb-item" to={"/"}>
                            Trang Chủ
                        </Link>
                        <Link className="breadcrumb-item" to={"cart"}>
                            Giỏ Hàng
                        </Link>
                    </ul>
                    <p className="count">Có {lstcart.length} Sản Phẩm Trong Giỏ Hàng</p>
                </div>
                <div className="row">
                    {/* Cart-left */}
                    <section className="cart-left col-9">
                        {lstcart.map((lstcart, index) => {
                            return (
                                <>
                                    <div className="product-content row" style={{ marginBottom: '3%', borderBottom: '1px solid' }}>
                                        <div className="product-content-left row col-lg-4">
                                            <div className="product-content-left-big-img">
                                                {imageUrls.map((img, index1) => {
                                                    return (
                                                        lstcart.media.map((item, index2) => {
                                                            return (
                                                                img.nameImg === item.url && index2 === 0 &&
                                                                <img src={img.url} width='170px' height='150px' style={{ paddingBottom: '5px' }} />
                                                            )
                                                        })
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="product-content-right col-lg-8" style={{ textAlign: 'left' }}>
                                            <div className='row'>
                                                <div className="col-lg-3">
                                                    <h5>{lstcart.name_Product}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <p className="color">{lstcart.color_Product}</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <p>{lstcart.price}<sup>đ</sup></p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <p className="color">{lstcart.price * lstcart.quantity}<sup>đ</sup></p>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="row">
                                                        <div className="col-lg-1">
                                                            <p className="SizeOne">Size:</p>
                                                        </div>
                                                        <div className="col-lg-10">
                                                            {lstcart.size.map(item => {
                                                                if (item.quantity > 0 && item.status == true && item.selected == false) {
                                                                    return <button value={item.id} onClick={() => updateSize(lstcart.id, lstcart.product_ID, item.id)} className="btn">{item.title}</button>
                                                                } else if (item.quantity <= 0 || item.status === false) {
                                                                    return <button className="btn" style={{ borderColor: 'white', color: '#b6b6b6fe' }} disabled >{item.title}</button>
                                                                }
                                                                else if (item.selected == true) {
                                                                    return <button className="btn" style={{ borderColor: 'red', color: 'red' }} >{item.title}</button>
                                                                }
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <NumericInput min={1} max={lstcart.quantitySize} value={lstcart.quantity} onChange={(value) => updateQuantity(lstcart.id, lstcart.product_ID, value, lstcart.quantitySize)} />
                                                    <p>Còn {lstcart.quantitySize} sản phẩm</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </section>
                    {/* Cart-right */}
                    <div className="cart-right col-3 bg-light">
                        <div className="summary">
                            <ul>
                                <li>
                                    Tổng Cộng: <span>{totalPrice}</span>
                                </li>
                                <li className="total">
                                    Tổng: <span>{lstcart.length}</span> Sản Phẩm
                                </li>
                            </ul>
                        </div>

                        <div className="checkout">
                            <button type="button" onClick={() => nextToPayment()}>Thanh Toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
