import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';

const UpdateVoucher = (props) => {

    const { isupdatevoucherModal, toggleModal } = props;
    const [voucher, setVoucher] = useState(props.voucher);

    useEffect(() => {
        setVoucher(props.value)
    }, [props.voucher])
    const updateVoucher = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/api/voucher/update/${voucher.id}`, {
                name: voucher.name,

            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const toggle = () => {
        toggleModal()
    }
    return (
        <div>
            <Modal isOpen={isupdatevoucherModal} toggle={() => toggle()} size='lg' centered>
                <ModalHeader toggle={() => toggle()}>Update Voucher</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <form className="needs-validation">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Name</label>
                                        {/* không cho người dùng nhập thì dùng readOnly */}
                                        <input type="text" className="form-control" />
                                        {/* {errors.code && (
                                        <div className="alert alert-danger" role="alert">
                                            Code không hợp lệ!
                                        </div>
                                    )} */}
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Giảm giá</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            max={100}
                                        // {...register("discount", {
                                        //     required: true,
                                        //     min: 0,
                                        //     max: 100,
                                        // })}
                                        />
                                        {/* {errors.discount && (
                                        <div className="alert alert-danger" role="alert">
                                            Giảm giá không hợp lệ!
                                        </div>
                                    )} */}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Lượt sử dụng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                        // {...register("count", {
                                        //     required: true,
                                        //     min: 0,
                                        // })}
                                        />
                                        {/* {errors.count && (
                                        <div className="alert alert-danger" role="alert">
                                            Lượt sử dụng không hợp lệ!
                                        </div>
                                    )} */}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Trạng thái hoạt động</label>
                                        <select
                                            className="form-control"
                                        // {...register("isActive", { required: false })}
                                        >
                                            <option value="false">Không hoạt động</option>
                                            <option value="true">Hoạt động</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            min="2022-01-01"
                                            // max="2023-01-01"
                                            className="form-control"
                                        // {...register("expireDate", {
                                        //     required: true,
                                        // })}
                                        />
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            // min="2022-01-01"
                                            // max="2023-01-01"
                                            className="form-control"
                                        // {...register("expireDate", {
                                        //     required: true,
                                        // })}
                                        />
                                    </div>

                                </div>
                                {/* <button
                                    className="btn btn-primary btn-lg mt-5 mb-5"
                                    type="submit"
                                    style={{ marginLeft: 80, borderRadius: 50 }}
                                >
                                    Cập nhật
                                </button> */}
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>
                        Cập Nhập
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UpdateVoucher;