import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';

const UpdateRole = (props) => {

    const token = localStorage.getItem('token');
    const { isupdateRolleModal, toggleModal, updateData } = props;
    const [role, setRole] = useState(props.role);
    console.log(role);
    const [lstcate, setLstCate] = useState([]);
    const { data: roles } = useCallGetAPI(`http://localhost:8080/role/getPermission`, { headers: { "Authorization": `Bearer ${token}` } });
    const [check, setCheck] = useState({ name: '', description: '' });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setLstCate(roles)
    }, [roles])

    useEffect(() => {
        setRole(props.role)

    }, [props.role])

    const handleOnchangeInput = (event, id) => {
        let copyRole = { ...role };
        copyRole[id] = event.target.value;
        try {

            let ch1 = { ...check };
            if (copyRole[id].trim().length <= 0) {
                ch1[id] = `${id} không được để trống !!`
                if (id == "name") {
                    ch1[id] = "Tên không được để trống !!"
                }
                setCheck({
                    ...ch1
                })
            }
        } catch (error) {
            let ch1 = { ...check };
            ch1[id] = `${id} không được để trống !!`
            console.log(error);
            setCheck({
                ...ch1
            })
        }
        setRole({
            ...copyRole
        })
    }

    const notifySuccess = (text) => {
        toast.success(text, styleToast)
    };
    const notifyWarning = (text) => {
        toast.warning(text, styleToast);
    };
    const styleToast = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    console.log(role);

    const updateVoucher = async () => {
        try {
            let ch1 = { ...check };
            if (role.name?.trim().length <= 0
                && role.description?.trim().length <= 0
            ) {
                ch1["name"] = "Tên không để trống"
                ch1["description"] = "Mô tả không để trống"
                setCheck({ ...ch1 })
                return
            } else if (role.name?.trim().length <= 0) {
                ch1["name"] = "Tên không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (role.description.trim().length <= 0) {
                ch1["value"] = "Mô tả không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (
                check.name?.trim().length > 0
                || check.description.trim().length > 0
            ) {
                return
            }
            const res = await axios.put(`http://localhost:8080/role/update/${role.id}`, role,
                { headers: { "Authorization": `Bearer ${token}` } })
            let data = (res && res.data) ? res.data : [];
            toggle()
            updateData(data, 'update')
            notifySuccess("Cập nhập thành công")
        } catch (error) {
            console.log(error.message);
        }
    }


    const toggle = () => {
        toggleModal();
        setRole({});
        setCheck({});
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isupdateRolleModal} toggle={() => toggle()} size='lg' centered>
                <ModalHeader toggle={() => toggle()}>Cập Nhập</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <form className="needs-validation">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Tên</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder=""
                                            id="name"
                                            name="name"
                                            required
                                            value={role.name}
                                            onChange={(event) => handleOnchangeInput(event, 'name')} />
                                        {check.name && check.name.length > 0 && <p className="checkError">{check.name}</p>}
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Mô Tả</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={role.description}
                                            onChange={(event) => handleOnchangeInput(event, 'description')}
                                        />
                                        {check.description && check.description.length > 0 && <p className="checkError">{check.description}</p>}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Quyền truy cập</label>
                                        <Multiselect
                                            isObject={false}
                                            options={options}
                                            showCheckbox
                                        />
                                        {/* <input
                                            type="number"
                                            className="form-control"
                                            placeholder=""
                                            id="quantity"
                                            name="quantity"
                                            value={role.quantity}
                                            onChange={(event) => handleOnchangeInput(event, 'quantity')}
                                        />
                                        {check.quantity && check.quantity.length > 0 && <p className="checkError">{check.quantity}</p>} */}
                                    </div>
                                    <div className="col-sm-12 mt-5">
                                        <label className="form-label">Danh mục</label>
                                        <select
                                            className="form-control"
                                            id="categoryId"
                                            name="categoryId"
                                            placeholder=""
                                            onChange={(event) => handleOnchangeInput(event, 'categoryId')}
                                        >
                                            {lstcate.map((item, index) => {
                                                if (item.id === role.categoryId) {
                                                    return (
                                                        <option key={index} value={item.id} selected>
                                                            {item.namecate}
                                                        </option>
                                                    )
                                                }
                                                return (
                                                    <option key={index} value={item.id} >
                                                        {item.namecate}
                                                    </option>
                                                )

                                            })}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateVoucher(); }}>
                        Cập nhập
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UpdateRole;