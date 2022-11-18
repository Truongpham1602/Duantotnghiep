import React from 'react';
import { NavLink } from 'react-router-dom';
import '../voucher/voucher.css';

const Voucher = () => {


    return (
        <div className='voucher-layout-main'>
            <div className='card'>
                <div className='card-header mb-5'>
                    <NavLink to="/add-voucher" className="btn btn-primary" style={{ borderRadius: 50 }} >
                        Thêm voucher
                    </NavLink>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Code</th>
                            <th scope="col">Giảm giá(%)</th>
                            <th scope="col">Lượt sử dụng</th>
                            <th scope="col">Ngày hết hạn</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>123</td>
                            <td>20</td>
                            <td>3</td>
                            <td>20/11/2022</td>
                            <td>Hoạt Động</td>
                            <td>
                                <NavLink exact>
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Voucher;