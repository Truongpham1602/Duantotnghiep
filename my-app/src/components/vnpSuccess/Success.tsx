import React from 'react'
import './success.css'
import { NavLink } from "react-router-dom";
export default class OrderComponent extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto mt-5">
                            <div className="payment">
                                <div className="payment_header">
                                    <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
                                </div>
                                <div className="content">
                                    <h1>Thanh toán thành công !</h1>
                                    <NavLink className="nav-link goHome" to="/">Quay lại trang chủ</NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}