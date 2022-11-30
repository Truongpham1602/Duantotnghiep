import { React, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../Firebase";

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


const User_Rest_API_URL = 'http://localhost:8080/admin/user';

const notifyWarning = (text) => {
    toast.warning(text, styleToast);
};
const notifySuccess = (text) => {
    toast.success(text, styleToast)
};
const notifyError = (text) => {
    toast.error(text, styleToast);
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

// class CreateUser extends Component {
const CreateUser = (props) => {

    const { isCreateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload } = props;
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    // const [updateData, setUpdateData] = useState(props);
    const [user, setUser] = useState({ fullName: '', password: '', email: '', telephone: '', address: '' });
    const [check, setCheck] = useState({ });

    const arrRole = [
        {
            id: 2, title: 'Nhân viên'
        },
        {
            id: 3, title: 'Khách hàng'
        }
    ]



    const handleOnchangeInput = (event, id) => {
        const copyUser = { ...user };
        // copyUser[id] = event.target.value;
        if (id === 'image') {
            copyUser[id] = event.target.files[0].name;
        } else {
            copyUser[id] = event.target.value;
        }

        setUser({
            ...copyUser
        })
    }
    const createUser = () => {
        try {


            // if (user.fullName.trim().length <= 0 || user.password.trim().length <= 0
            // || user.email.trim().length <= 0 || user.telephone.trim().length <= 0
            //    || user.address.trim().length <= 0 
            // ) {
            //     notifyWarning("Cần nhập thông tin!")
            //     return
            // } 

            let ch0 = { ...check };
            const create = async () => {
                if (user.fullName?.trim().length <= 0
                && user.password?.trim().length <= 0
                && user.email?.trim().length <= 0
                && user.telephone?.trim().length <= 0
                && user.address?.trim().length <= 0
            ) {
                ch0["fullName"] = "Name not null"
                ch0["password"] = "Password not null"
                ch0["email"] = "Email not null"
                ch0["telephone"] = "Telephone not null"
                ch0["address"] = "Address not null"
                setCheck({ ...ch0 })
                return
            }
            else if (user.fullName.trim().length <= 0) {
                ch0["fullName"] = "Name not null"
                setCheck({ ...ch0 })
                return
            }
            else if (user.password.trim().length <= 0) {
                ch0["password"] = "Password not null"
                setCheck({ ...ch0 })
                return
            }
            else if (user.email.trim().length <= 0) {
                ch0["email"] = "Email not null"
                setCheck({ ...ch0 })
                return
            }
            else if (user.telephone.trim().length <= 0) {
                ch0["telephone"] = "Telephone not null"
                setCheck({ ...ch0 })
                return
            }
            else if (user.address.trim().length <= 0) {
                ch0["address"] = "Address not null"
                setCheck({ ...ch0 })
                return
            }
            else if ( check.fullname.trim().length > 0
                || check.password.trim().length > 0
                || check.email.trim().length > 0
                || check.telephone.trim().length > 0
                || check.address.trim().length > 0) {
                return
            }

                let res = await axios.post(User_Rest_API_URL + '/post', {
                    roleId: user.roleId,
                    fullName: user.fullName,
                    password: user.password,
                    email: user.email,
                    telephone: user.telephone,
                    address: user.address,
                    image: user.image,
                    created: user.created,
                    creator: user.creator,
                    modified: user.modified,
                    modifier: user.modifier,
                    status: user.status
                })
                let data = (res && res.data) ? res.data : []
                data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
                if (data.modified > 0) {
                    data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
                }
                updateData(data, `create`)
                toggle()
                notifySuccess('Thêm mới user thành công')
            }
            create()
        } catch (error) {
            console.log(error.message);
        }
    }


    const toggle = () => {
        toggleModal()
        setUser({ fullName: '', password: '', email: '', telephone: '', address: '' });
        setImageUpload('')
    }


    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isCreateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Create</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        Name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder=""
                                        type="text"
                                        value={user.fullName}
                                        onChange={(event) => handleOnchangeInput(event, 'fullName')}
                                    />
                                    {check.fullName && check.fullName.length > 0 && <p className="checkError1">{check.fullName}</p>}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder=""
                                        type="password"
                                        value={user.password}
                                        onChange={(event) => handleOnchangeInput(event, 'password')}
                                    />
                                    {check.password && check.password.length > 0 && <p className="checkError1">{check.password}</p>}
                                </FormGroup>
                            </Col>
                        </Row>
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
                                        type="email"
                                        value={user.email}
                                        onChange={(event) => handleOnchangeInput(event, 'email')}
                                    />
                                     {check.email && check.email.length > 0 && <p className="checkError1">{check.email}</p>}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="image">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        // value={user.image}
                                        onChange={(event) => { handleOnchangeInput(event, 'image'); setImageUpload(event.target.files[0]) }}
                                    />
                                     {/* {check.password && check.password.length > 0 && <p color='red'>{check.password}</p>} */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="telephone">
                                                Telephone
                                            </Label>
                                            <Input
                                                id="telephone"
                                                name="telephone"
                                                placeholder=""
                                                type="text"
                                                value={user.telephone}
                                                onChange={(event) => handleOnchangeInput(event, 'telephone')}
                                            />
                                             {check.telephone && check.telephone.length > 0 && <p className="checkError1">{check.telephone}</p>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="address">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                placeholder=""
                                                type="text"
                                                value={user.address}
                                                onChange={(event) => handleOnchangeInput(event, 'address')}
                                            />
                                             {check.address && check.address.length > 0 && <p className="checkError1">{check.address}</p>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="roleId">
                                                Role
                                            </Label>
                                            <Input
                                                id="roleId"
                                                name="roleId"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeInput(event, 'roleId')}
                                            >
                                                    {arrRole.map(item => {
                                                        if (user.roleId === item.id) {
                                                            return <option selected value={item.id}>{item.title}</option>
                                                        }
                                                        return <option value={item.id}>{item.title}</option>
                                                    })}

                                            </Input>    
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                {imageUpload &&
                                    <img width='100%' height='241rem' src={URL.createObjectURL(imageUpload)} />
                                }
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { createUser(e); uploadFile(e) }}>
                        Add New
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default CreateUser;