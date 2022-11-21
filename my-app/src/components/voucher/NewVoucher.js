import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';

const NewVoucher = (props) => {
    const { isNewVoucherModal, toggleModal } = props;

    const toggle = () => {
        toggleModal()
    }

    return (
        <div>
            <Modal isOpen={isNewVoucherModal} toggle={() => toggle()} size='lg' centered>
                <ModalHeader toggle={() => toggle()}>Thêm Mới Voucher</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <form className="needs-validation">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                        // {...register("code", {
                                        //     required: true,
                                        //     pattern: /^\s*\S+.*/
                                        // })}
                                        />
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
                                            id="lastName"
                                            min={0}
                                            max={100}
                                        // {...register("discount", {
                                        //     required: true,
                                        //     min: 0,
                                        //     max: 100
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
                                            id="lastName"
                                            min={0}
                                        // {...register("count", {
                                        //     required: true,
                                        //     min: 0
                                        // })}
                                        />
                                        {/* {errors.count && (
                                            <div className="alert alert-danger" role="alert">
                                                Lượt sử dụng không hợp lệ!
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            min="2022-01-01"
                                            // max="2023-01-01"
                                            className="form-control"
                                            id="lastName"
                                        // {...register("expireDate", {
                                        //     required: true
                                        // })}
                                        />
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            // min="2022-01-01"
                                            max="2024-01-01"
                                            className="form-control"
                                            id="lastName"
                                        // {...register("expireDate", {
                                        //     required: true
                                        // })}
                                        />
                                    </div>
                                </div>
                                {/* <button
                                    className="btn btn-primary btn-lg mt-5 mb-5"
                                    type="submit"
                                    style={{ marginLeft: 80, borderRadius: 50 }}
                                >
                                    Thêm mới
                                </button> */}
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>
                        Thêm Mới
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default NewVoucher;