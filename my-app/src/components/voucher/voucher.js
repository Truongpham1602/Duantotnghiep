import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../voucher/voucher.css';
import UpdateVoucher from './UpdateVoucher';
import NewVoucher from './NewVoucher';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import moment from 'moment';

const Voucher = () => {

    const [voucher, setVoucher] = useState({});
    const [isNewVoucherModal, setIsNewVoucherModal] = useState(false)
    const [isupdatevoucherModal, setIsupdatevoucherModal] = useState(false)
    const [dataVoucher, setData] = useState([]);
    const [page, setPage] = useState(0);
    const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/api/voucher/get`);
    useEffect(() => {
        if (dataPro && dataPro.length > 0) {
            setData(dataPro)
        }
    }, [dataPro])


    const updateData = (res, type) => {
        if (type === 'create') {
            let copydata = dataVoucher;
            copydata.unshift(res);
            setData(copydata);
        }
        else if (type === 'update') {
            let copydata = dataVoucher;
            let getIndex = copydata.findIndex((p) => { return p.id === res.id });
            copydata.fill(res, getIndex, getIndex + 1);
            setData(copydata)
        }
    }

    const editVoucher = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/voucher/get/${id}`)
            setVoucher(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteVoucher = (id) => {
        try {
            const updateStatusFalse = async () => {
                const res = await axios.put(`http://localhost:8080/api/voucher/setStatusFalse/${id}`)
                let copyList = [...dataVoucher]
                let getIndex = copyList.findIndex((p) => { return p.id === res.data.id });
                copyList.fill(res.data, getIndex, getIndex + 1);
                setData(copyList)
            }
            updateStatusFalse()
        } catch (error) {
            console.log(error.message)
        }
    }

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
                updateData={updateData}
                voucher={voucher}
            />

            <NewVoucher
                isNewVoucherModal={isNewVoucherModal}
                toggleModal={newVoucherModal}
                updateData={updateData}
                voucher={voucher}
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
                        <thead style={{ verticalAlign: 'middle' }}>
                            <tr>
                                <th scope="col">#</th>
                                {/* name */}
                                <th scope="col">Name</th>

                                {/* value */}
                                <th scope="col">Giảm giá(%)</th>
                                {/* quantity */}
                                <th scope="col">Lượt sử dụng</th>
                                {/*  */}
                                <th scope="col">Category</th>
                                {/* effect from */}
                                <th scope="col">Ngày bắt đầu</th>
                                {/* effect until */}
                                <th scope="col">Ngày hết hạn</th>
                                <th scope="col">Description</th>
                                {/* status */}
                                <th scope="col">Trạng thái</th>
                                <th scope="col" colspan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ verticalAlign: 'middle' }}>
                            {
                                !isLoading && dataVoucher && dataVoucher.length > 0 && dataVoucher.map((item, index) => {
                                    let effectFrom = moment(item.effectFrom).format('DD/MM/YYYY');
                                    let effectUntil = moment(item.effectUntil).format('DD/MM/YYYY');
                                    // if (item.status != 0)
                                    return (
                                        <tr key={item.id}>
                                            <th scope="row" id="">{index + 1}</th>
                                            <td id="name">{item.name}</td>
                                            <td id="value">{item.value}</td>
                                            <td id="quantity">{item.quantity}</td>
                                            <td id="category">{item.namecate}</td>
                                            <td id="effectFrom">{effectFrom}</td>
                                            <td id="effectUntil">{effectUntil}</td>
                                            <td id="description"><textarea>{item.description}</textarea></td>
                                            <td id="status">{Number(item.status) == 1 ? "Hoạt động" : "Không hoạt động"}</td>
                                            <td>
                                                <button className="btn btn-primary update update-voucher"
                                                    type='buttom' id="update" style={{ borderRadius: 50 }}
                                                    onClick={() => { editVoucher(item.id); updatevoucherModal() }}>
                                                    cập nhập
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger delete delete-voucher"
                                                    id="delete" style={{ borderRadius: 50 }}
                                                    onClick={() => { deleteVoucher(item.id) }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {/* {
                                !isLoading && dataVoucher && dataVoucher.length > 7 && Object.length(
                                    dataVoucher.slice(7 * page, 7 * page + 7)
                                ).map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <th scope="row" id="">{index + 1}</th>
                                            <td id="name">{item.name}</td>
                                            <td id="description">{item.description}</td>
                                            <td id="value">{item.value}</td>
                                            <td id="quantity">{item.quantity}</td>
                                            <td id="category">{item.name_cate}</td>
                                            <td id="effectFrom">{item.effectFrom}</td>
                                            <td id="effectUntil">{item.effectUntil}</td>
                                            <td id="status">{item.status ? "Hoạt động" : "Không hoạt động"}</td>
                                            <td>
                                                <NavLink className="btn btn-primary update update-voucher"
                                                    type='buttom' id="update" style={{ borderRadius: 50 }}
                                                    onClick={() => { editVoucher(item.id); updatevoucherModal() }}>
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
                                    )
                                })
                            } */}

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