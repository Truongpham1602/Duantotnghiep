import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../voucher/voucher.css';
import UpdateVoucher from './UpdateVoucher';
import NewVoucher from './NewVoucher';

const Voucher = () => {

    const [isNewVoucherModal, setIsNewVoucherModal] = useState(false)
    const [isupdatevoucherModal, setIsupdatevoucherModal] = useState(false)
    const [dataVoucher, setData] = useState([]);
    const [page, setPage] = useState(0);

    const updatevoucherModal = () => {
        setIsupdatevoucherModal(!isupdatevoucherModal)
    }
    const newVoucherModal = () => {
        setIsNewVoucherModal(!isNewVoucherModal)
    }

    const onBack = () => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    const onNext = () => {
        setPage(page + 1 < dataVoucher.length / 7 ? page + 1 : page);
    };

    return (
        <>
            <UpdateVoucher
                isupdatevoucherModal={isupdatevoucherModal}
                toggleModal={updatevoucherModal}
            />

            <NewVoucher
                isNewVoucherModal={isNewVoucherModal}
                toggleModal={newVoucherModal}
            />

            <div className='voucher-layout-main'>
                <div className='card'>
                    <div className='card-header mb-5'>
                        <NavLink className="btn btn-primary" style={{ borderRadius: 50 }}
                            onClick={() => newVoucherModal()}>
                            Thêm voucher
                        </NavLink>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                {/* name */}
                                <th scope="col">Name</th>
                                {/* value */}
                                <th scope="col">Giảm giá(%)</th>
                                {/* quantity */}
                                <th scope="col">Lượt sử dụng</th>
                                {/* effect from */}
                                <th scope="col">Ngày bắt đầu</th>
                                {/* effect until */}
                                <th scope="col">Ngày hết hạn</th>
                                {/* status */}
                                <th scope="col">Trạng thái</th>
                                <th scope="col" colspan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>abcd123</td>
                                <td>20</td>
                                <td>3</td>
                                <td>20/10/2022</td>
                                <td>20/11/2022</td>
                                <td>Hoạt Động</td>
                                <td>
                                    <NavLink className="btn btn-primary update update-voucher"
                                        type='buttom' id="update" style={{ borderRadius: 50 }}
                                        onClick={() => updatevoucherModal()}>
                                        cập nhập
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink className="btn btn-danger delete delete-voucher"
                                        id="delete" style={{ borderRadius: 50 }}>
                                        Delete
                                    </NavLink>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='10'>
                                    <button className="hoverable" onClick={onBack}>
                                        Back
                                    </button>
                                    <label style={{ margin: '0 10px' }}>{page + 1}</label>
                                    <button className="hoverable" onClick={onNext}>
                                        Next
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}
export default Voucher;