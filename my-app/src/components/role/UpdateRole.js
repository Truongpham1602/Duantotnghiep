import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

const UpdateRole = (props) => {
    const token = localStorage.getItem('token');
    const { data: premissions } = useCallGetAPI(`http://localhost:8080/role/getPermission`, { headers: { "Authorization": `Bearer ${token}` } });
    const { isupdateRolleModal, toggleModal, updateData } = props;
    const [role, setRole] = useState(props.role);
    const [lstRole, setLstRole] = useState([]);
    const [check, setCheck] = useState({ roleName: '', description: '' });
    const [options, setOptions] = useState([]);
    const [lstPreSelected, setLstPreSelected] = useState([]);
    const [selectOption, setselectOption] = useState([]);



    useEffect(() => {
        setRole(props.role)
        // props.role.premission.map(item => { lstPreSelected.push({ id: item.id }) })

    }, [props.role])

    useEffect(() => {
        // setLstRole(premissions)

        setOptions(premissions.map(item => { return { value: item.id, label: item.description } }));
        // let f = options.map(item => item.id);
        setselectOption(options.filter(item => role.premission.includes(item.value)))
        // premissions.map(item => { setOptions((Prev) => [...Prev, item.id + ' ' + item.description]) })

    }, [premissions])
    console.log(options);

    const handleOnchangeInput = (event, id) => {
        let copyRole = { ...role };
        copyRole[id] = event.target.value;
        try {

            let ch1 = { ...check };
            if (copyRole[id].trim().length <= 0) {
                ch1[id] = `${id} không được để trống !!`
                if (id == "roleName") {
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

    const perSelected = (items) => {
        for (let i in items) {
            let item = items[i];
            let id = item.substring(0, 2).trim();
            if (!lstPreSelected.map((p) => p.id).includes(id)) {
                lstPreSelected.push({ id: id });
            }
        }

    }
    const perRemove = (items) => {
        for (let i in items) {
            let item = items[i];
            let id = item.substring(0, 2).trim();
            let index = lstPreSelected.map((p) => p.id).indexOf(id)
            if (index !== -1) {
                lstPreSelected.splice(index, 1);
            }
        }
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
            if (role.roleName?.trim().length <= 0
                && role.description?.trim().length <= 0
            ) {
                ch1["roleName"] = "Tên không để trống"
                ch1["description"] = "Mô tả không để trống"
                setCheck({ ...ch1 })
                return
            } else if (role.roleName?.trim().length <= 0) {
                ch1["roleName"] = "Tên không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (role.description.trim().length <= 0) {
                ch1["description"] = "Mô tả không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (
                check.roleName?.trim().length > 0
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
                                            id="roleName"
                                            name="roleName"
                                            required
                                            value={role.roleName}
                                            onChange={(event) => handleOnchangeInput(event, 'roleName')} />
                                        {check.roleName && check.roleName.length > 0 && <p className="checkError">{check.roleName}</p>}
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
                                        {/* <Multiselect
                                            isObject={false}
                                            options={options}
                                            showCheckbox
                                            defaultValue={options}
                                            onChange={setOptions}
                                        onRemove={(event) => perRemove(event)}
                                        onSelect={(event) => perSelected(event)}
                                        /> */}
                                        <Select
                                            defaultValue={selectOption}
                                            onChange={setselectOption}
                                            options={options}
                                            isMulti
                                        />
                                        {/* <Multiselect
                                            dataKey="id"
                                            textField="color"
                                            defaultValue={[1]}
                                            data={[
                                                { id: 1, color: "Red" },
                                                { id: 2, color: "Yellow" },
                                                { id: 3, color: "Blue" },
                                                { id: 4, color: "Orange" },
                                            ]}
                                        /> */}
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