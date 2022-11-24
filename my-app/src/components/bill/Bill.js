import { React, useState, useEffect } from 'react';
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

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
  Row, Col, Form
} from 'reactstrap';
import Badge from '@mui/material/Badge';

// class Bill extends React.Component {
const Bill = () => {


  const [lstproduct, setLstProduct] = useState([])
  const { data: dataCart } = useCallGetAPI(`http://localhost:8080/cart/getCart?user_Id=`)
  const [totalPrice, setTotalPrice] = useState()
  const [lstcart, setLstCart] = useState([])
  const [source, setSource] = useState()
  const [number, setNumber] = useState({})
  const imagesListRef = ref(storage, "images/");
  const [imageUrls, setImageUrls] = useState([]);

  const [Products, setProducts] = useState('null')
  const [user, setUser] = useState({})
  const vnpay = [
    {
      title: 'Ngân hàng',
      card: 'NCB'
    },
    {
      title: 'Loại thẻ quốc tế',
      card: 'VISA'
    },
    {
      title: 'Loại thẻ quốc tế',
      card: 'MasterCard'
    },
  ]
  // const [user, setUser] = useState({})
  const handleOnchangeInput = (e, id) => {
    let copy = { ...user }
    copy[id] = e.target.value
    setUser(copy)
  }

  useEffect(() => {
    let total = 0;
    const setTotal = () => {
      setLstCart(dataCart)
      dataCart.map(item => {
        total += item.price
      })
      setTotalPrice(total)
    }
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

  const createOrder = async () => {
    let res = await axios.post(`http://localhost:8080/order/createNoUser?voucher_Id=`, user)


  }


  return (
    <>
      <Row className='row-cart' style={{ overflow: 'unset', padding: '1%' }}>
        <Col md={5} style={{ padding: '1%', marginTop: '2%' }}>
          <div><h3>Thông tin người nhận</h3></div>
          <Form style={{ padding: '0% 0% 0% 5%' }}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder=""
                    type="text"

                    onChange={(event) => handleOnchangeInput(event, 'email')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="color">
                    Name
                  </Label>
                  <Input
                    id="nameRecipient"
                    name="nameRecipient"
                    placeholder=""
                    type="text"
                    onChange={(event) => handleOnchangeInput(event, 'nameRecipient')}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="number Number phone">
                    Phone Number
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    placeholder=""
                    type="text"
                    onChange={(event) => handleOnchangeInput(event, 'telephone')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="address">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder=""
                    type="text"
                    onChange={(event) => handleOnchangeInput(event, 'address')}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    size='lg'
                    onChange={(event) => handleOnchangeInput(event, 'description')}
                  />
                </FormGroup>
                <div>Phương thức thanh toán</div>
                <Input
                  type='select'
                >
                  {vnpay.map(item => {
                    return <option>{item.title} - {item.card}</option>
                  })}
                </Input>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={7} style={{ boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '15px', padding: '1%' }}>
          <h3>Đơn hàng</h3>
          {lstcart.map((lstcart, index) => {
            return (
              <>
                <Row style={{ marginBottom: '5px' }}>
                  <Col md={3}>
                    {imageUrls.map((img, index1) => {
                      return (
                        lstcart.media.map((item, index2) => {
                          return (
                            img.nameImg === item.url && index2 === 0 &&
                            <Badge badgeContent={lstcart.quantity} color="primary">
                              <img src={img.url} width="150px" height='100px' />
                            </Badge>
                          )
                        })
                      )
                    })}
                  </Col>
                  <Col md={6}>
                    <p>{lstcart.name_Product} / {lstcart.sizeName}</p>
                  </Col>
                  <Col md={3}>
                    <p>{lstcart.price * lstcart.quantity}</p>
                  </Col>
                </Row>

              </>
            );
          })}
          <div>Voucher</div>
          <div className="cart-right col-4 bg-light">
            <div className="summary">
              <ul>
                <li>
                  Tổng Cộng: <span>{totalPrice}</span>
                </li>
                <li>
                  Giảm: <span>{ }</span>
                </li>
                <li className="total">
                  Tổng: <span>{lstcart.length}</span> Sản Phẩm
                </li>
              </ul>
            </div>

            <div className="checkout">
              <button type="button" onClick={() => { createOrder(); window.location.href = `http://localhost:8080/thanh-toan-vnpay?amount=${totalPrice}&bankcode=NCB&language=vi&txt_billing_mobile=${user.telephone}&txt_billing_email=${user.email}&txt_billing_fullname=${user.nameRecipient}&txt_inv_addr1=${user.address}&txt_bill_city=ha%20noi&txt_bill_country=viet%20nam&txt_bill_state=ha%20noi&txt_inv_mobile=0389355471&txt_inv_email=quanganhsaker@gmail.com&txt_inv_customer=Nguy%E1%BB%85n%20Van%20A&txt_inv_addr1=ha%20noi&city&txt_inv_company=fsoft&txt_inv_taxcode=10&cbo_inv_type=other&vnp_OrderType=other&vnp_OrderInfo=order%20info%20test` }}>Đặt hàng</button>
            </div>
          </div>
        </Col>
      </Row>




    </>
  )
}

export default Bill
