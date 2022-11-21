import {React , useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import '../css/detailsProduct.css';
import img1 from '../image/blog/blog-2.jpg';
import img2 from '../image/blog/blog-3.jpg';
import img3 from '../image/blog/blog-4.jpg';
import img4 from '../image/blog/blog-5.jpg';
import img5 from '../image/blog/blog-6.jpg';
const ProductDetails = (props) => {
    // const [modal, setModal] = useState(false);
    // const toggle = () => setModal(!modal);
    const { isDetailsModal, toggleModal } = props;
    return (
        <div>
            <Modal isOpen={isDetailsModal} toggle={toggleModal} size='xl' centered>
            <ModalHeader toggle={toggleModal}>Details Product</ModalHeader>
            <ModalBody>
                <div className="product-details row">
                    <div className="product-details-left row col-lg-7">
                        <div className="product-details-left-small-img">
                            <img src={img2} alt="" />
                            <img src={img3} alt="" />
                            <img src={img4} alt="" />
                            <img src={img5} alt="" />
                        </div>
                        <div className="product-details-left-big-img">
                            <img src={img1} alt="" />
                        </div>
                    </div>
                    <div className="product-details-right col-lg-5">
                        <div className="product-details-right-product-name">
                            <h1>áo thun cổ trong</h1>
                        </div>
                        <div className="product-details-right-product-color">
                            <p className="color"><span className="colorDetails">Color: </span>Xanh cổ vịt nhạt <span style={{ color:'red'}}>*</span></p>
                        </div>
                        <div className="product-details-right-product-price">
                            <p><span className="priceDetails">Price: </span>1.500.000<sup>đ</sup></p>
                        </div>
                        
                        <div className="product-details-right-product-size row">
                            <div className="col-lg-1">
                                <span className="SizeDetails">Size: </span>
                            </div>
                            <div className="col-lg-11 sizeDetai">
                                <span className="sizeDetai1 btn">36</span>
                                <span className="btn">37</span>
                                <span className="btn">38</span>
                                <span className="btn">39</span>
                                <span className="btn">40</span>
                                <span className="btn">41</span>
                                <span className="btn">42</span>
                                <span className="btn">43</span>
                                <span className="btn">44</span>
                                <span className="btn">45</span>
                                <span className="btn">46</span>
                            </div>
                        </div>
                        <div className="product-details-right-product-quantity">
                                <span className="quantityLeft">Quantity: </span><span>123</span>
                        </div>
                        <div className="product-details-right-product-created">
                                <span className="createdLeft">Created: </span>
                                <span className="creatorLeft">15/11/2022 - Nguyễn Văn A</span>
                        </div>
                        <div className="product-details-right-product-modified">
                            <span className="modifiedLeft">Modified: </span>
                            <span className="modifierLeft">16/11/2022 - Nguyễn Văn B</span>
                        </div>
                        {/* <div className="product-details-right-product-button">
                            <button class="fas fa-cart-arrow-down btnGioHang"> Update</button>
                        </div> */}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={toggleModal}>
                Do Something
                </Button>{' '} */}
                <Button color="secondary" onClick={toggleModal}>
                Cancel
                </Button>
            </ModalFooter>
            </Modal>
        </div>
    );
}
export default ProductDetails;