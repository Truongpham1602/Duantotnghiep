import React from "react";
import {Breadcrumb, BreadcrumbItem, Input} from 'reactstrap';
// import '../css/styles.css';
import '../css/productOne.css';
import img1 from '../image/cart/cart-1.jpg';
import img2 from '../image/product/details/thumb-1.jpg';
import img3 from '../image/product/details/thumb-2.jpg';
import img4 from '../image/product/details/thumb-3.jpg';
import img5 from '../image/product/details/thumb-4.jpg';

const ProductOne = () => {
    return (
        <section className="productOne">
            <div className="container">
                <div className="product-top">
                    {/* <p>Home</p> <span>Giày Nam</span> */}
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                        <BreadcrumbItem active>Data</BreadcrumbItem>
                    </Breadcrumb> 
                </div>
                <div className="product-content row">
                    <div className="product-content-left row">
                        <div className="product-content-left-big-img">
                            <img src={img1} alt="" />
                        </div>
                        <div className="product-content-left-small-img">
                            <img src={img2} alt="" />
                            <img src={img3} alt="" />
                            <img src={img4} alt="" />
                            <img src={img5} alt="" />
                        </div>
                    </div>
                    <div className="product-content-right">
                        <div className="product-content-right-product-name">
                            <h1>áo thun cổ trong ph15225 hhaha</h1>
                        </div>
                        <div className="product-content-right-product-price">
                            <p>1.500.000<sup>đ</sup></p>
                        </div>
                        <div className="product-content-right-product-color">
                            <p className="color"><span className="colorOne">Màu Sắc: </span>Xanh cổ vịt nhạt <span style={{ color:'red'}}>*</span></p>
                            <div className="product-content-right-product-color-img">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="product-content-right-product-size">
                            <p className="SizeOne">Size:</p>
                            <div className="size">
                                <span>36</span>
                                <span>37</span>
                                <span>38</span>
                                <span>39</span>
                                <span>40</span>
                            </div>
                        </div>
                        <div className="quantity">
                            <p className="quantityOne">Số Lượng:</p>
                            {/* <input type="number" min={0}  value='1'/> */}
                            <Input bsSize="lg" type="number" min={0} className="soluong" />
                            <p style={{ color:'red'}}>Vui lòng chọn size *</p>
                        </div>
                        <div className="product-content-right-product-button">
                            <button class="fas fa-cart-arrow-down"><p>Thêm vào giỏ hàng</p></button>
                        </div>
                        {/* <div className="product-content-right-bottom">
                            <div className="product-content-right-bottom-top">

                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ProductOne;