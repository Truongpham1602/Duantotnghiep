import React from "react";
// import '../css/styles.css';
import product1 from '../image/product/product-5.jpg';
import product2 from '../image/product/product-2.jpg';
import product3 from '../image/product/product-6.jpg';
import product4 from '../image/product/product-9.jpg';
import product5 from '../image/product/product-12.jpg';
import product6 from '../image/product/product-4.jpg';
import axios from 'axios';

import ProductShear from "../HOME/Productshear";
const ProductTest = () => {

    const addToCart = async (size_Id) => {
        let res = await axios.post(`http://localhost:8080/cart/addToCart`, {
            size_Id: size_Id,
            quantity: 1
        })
    }
    return (
        <div>
            <section class="product" id="product">
                <h1 class="heading">latest <span>Products</span></h1>
                <div class="box-container">
                    {/* <div class="box">
                        <div class="content">
                            <img src={product1} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div> */}
                    <div class="box">
                        <div class="content">
                            <img src={product2} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a onClick={() => addToCart(1)} class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product3} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a onClick={() => addToCart(2)} class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product4} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product5} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product6} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default ProductTest;