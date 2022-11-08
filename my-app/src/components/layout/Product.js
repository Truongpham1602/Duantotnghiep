import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row , Col } from "reactstrap";
import Header from "../HOME/header";
import Footer from "../HOME/Footer";
import ProductTest from "../HOME/ProductTest";
import ProductShear from "../HOME/Productshear";
// import '../css/stylees1.css';
// class Home extends React.Component {
const Product1 = () => {





    return (
        <>
            {/* <Header/> */}
            {/* <ProductTest /> */}
            <Container fluid>
                <Row>
                    <ProductShear/>
                </Row>
                <Row>
                    <Col className="bg-light" lg = "9">
                        <Outlet />
                    </Col>
                    <Col className="bg-light" lg = "3">
                        <h1 class="heading"></h1>
                        <div>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <Footer/> */}
        </>
    )
}

export default Product1;