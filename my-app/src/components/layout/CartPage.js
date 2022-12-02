import { React, useState, useEffect } from 'react';
import NumericInput from 'react-numeric-input';
import { Link, NavLink } from "react-router-dom";
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

const Cart = () => {

    const [lstproduct, setLstProduct] = useState([])
    const { data: dataCart } = useCallGetAPI(`http://localhost:8080/cart/getCart?user_Id=`)
    const [totalPrice, setTotalPrice] = useState()
    const [lstcart, setLstCart] = useState([])
    const [source, setSource] = useState()
    const [number, setNumber] = useState({})
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        let total = 0;
        const setTotal = () => {
            setLstCart(dataCart)
            dataCart.map(item => {
                total += item.price
            })
            setTotalPrice(total)
        }
        const imagesListRef = ref(storage, "images/");
        setImageUrls([])
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                let nameImg = item.name;
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { nameImg, url }]);
                });
            });
        });
        dataCart && setTotal()
    }, [dataCart])

    const handleOnchangeInput = (e, id) => {
        let copyNumber = number
        copyNumber[id] = e
        setNumber(copyNumber)
    }

    return (
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
                                    <div className="product-content-right col-lg-7" style={{ textAlign: 'left' }}>
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
                                                <p className="color">{lstcart.price}<sup>đ</sup></p>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    <div className="col-lg-1">
                                                        <p className="SizeOne">Size:</p>
                                                    </div>
                                                    <div className="col-lg-10">
                                                        {lstcart.size.map(item => {
                                                            return <button style={{ backgroundColor: 'cyan', margin: '2px' }} className="btnSize">{item.size}</button>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <NumericInput min={0} />
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
                        <NavLink to='/checkout'><button type="button" >Thanh Toán</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
