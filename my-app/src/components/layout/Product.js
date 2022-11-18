import React from "react";
import { CgSlack } from "react-icons/cg";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ProductShear from "../HOME/Productshear";
import '../css/productTest.css';
import { useOutletContext } from "react-router-dom";
// class Home extends React.Component {
const Product1 = () => {
    const [addToCart] = useOutletContext()




    return (
        <>
            {/* <Header/> */}
            {/* <ProductTest /> */}
            <Container fluid>
                {/* <Row>
                    <ProductShear />
                </Row> */}
                <h1 class="headingTest">latest <span>Products</span></h1>
                <Row>
                    <Col className="bg-light" lg="10">
                        <Outlet context={[addToCart]} />
                    </Col>
                    <Col className="bg-light product-right" lg="2">
                        <div className="col-12 mini-card product-categori">
                            <h4 className="text-danger fw-bolder product-right-text-top">Loại sản phẩm</h4>
                            <ul className="list-group-product">
                                <li><CgSlack className="icon-product" /><a href="#">Giày Nam</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Nữ</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Trẻ Em</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Đá Bóng</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Thời Trang</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Bóng Rổ</a></li>
                                <li><CgSlack className="icon-product" /><a href="#">Giày Chạy Bộ</a></li>
                            </ul>
                        </div>

                        <div className="col mt-3 mini-card">
                            <h4 className="text-danger fw-bolder">Giá</h4>
                            <ul className="list-group">
                                {/* {prices.map((item, index) => (
                                <div className="sidebar__item" key={index}>
                                    <div
                                    className={
                                        price.includes(item.value)
                                        ? `sidebar__item-inner active`
                                        : `sidebar__item-inner`
                                    }
                                    onClick={() => choosePriceHandler(item.value)}
                                    >
                                    <i className={item.icon}></i>
                                    <span>{item.display_name}</span>
                                    </div>
                                </div>
                                ))} */}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <Footer/> */}
        </>
    )
}

export default Product1;