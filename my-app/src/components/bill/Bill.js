import { React, useState, useEffect } from 'react';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';

// class Bill extends React.Component {
const Bill = () => {

  const { data: dataProduct } = useCallGetAPI(`http://localhost:8080/cart/getByUser_Id/1`)
  const [Products, setProducts] = useState('null')

  useEffect(() => {

    const getdata = () => {
      setProducts('1')
    }
    setTimeout(() => {
      getdata()
    }, 3000);
  })


  return (
    <>
      {Products !== 'null' &&
        <div>Địa chỉ người nhận</div>
      }
      {Products === 'null' &&
        <div>
          <input type='text' />
        </div>
      }
      <div>Sản phẩm</div>
      <div>Voucher</div>
      <div>Phương thức thanh toán</div>
      <div>
        Tổng SP <n />
        Thông tin Price <n />
        Giảm<n />
      </div>
      <div className="cart-right col-4 bg-light">
        <div className="summary">
          <ul>
            <li>
              Tổng Cộng: <span>{ }</span>
            </li>
            <li>
              Giảm: <span>$5.00</span>
            </li>
            <li className="total">
              Tổng: <span>{dataProduct.length}</span> Sản Phẩm
            </li>
          </ul>
        </div>

        <div className="checkout">
          <button type="button" onClick={() => window.location.href = `http://localhost:8080/thanh-toan-vnpay?amount=100&bankcode=NCB&language=vi&txt_billing_mobile=mobile&txt_billing_email=quanganhsaker@gmail.com&txt_billing_fullname=quang%20anh&txt_inv_addr1=ha%20noi&txt_bill_city=ha%20noi&txt_bill_country=viet%20nam&txt_bill_state=ha%20noi&txt_inv_mobile=0389355471&txt_inv_email=quanganhsaker@gmail.com&txt_inv_customer=Nguy%E1%BB%85n%20Van%20A&txt_inv_addr1=ha%20noi&city&txt_inv_company=fsoft&txt_inv_taxcode=10&cbo_inv_type=other&vnp_OrderType=other&vnp_OrderInfo=order%20info%20test`}>Thanh Toán</button>
        </div>
      </div>
    </>
  )
}

export default Bill
