import { React, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
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

// class CreateUser extends Component {
const CreateUser = (props) => {

    const { isCreateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload } = props;
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    // const [updateData, setUpdateData] = useState(props);
    const [user, setUser] = useState({});



    const handleOnchangeInput = (event, id) => {
        const copyUser = { ...user };
        if (id === 'image') {
            copyUser[id] = event.target.files[0].name;
        } else {
            copyUser[id] = event.target.value;
        }
        setUser({
            ...copyUser
        })
    }

    // const editUser = async (id) => {
    //     try {
    //         const res = await axios.get(User_Rest_API_URL + `/find/${id}`)
    //         setState({
    //             user: res.data
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const createUser = () => {
        try {
            const z = async () => {
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
            }
            z()
            // setState({
            //     lstUser: [...lstUser, res.data],
            // })
            // props.updateData();
        } catch (error) {
            console.log(error)
        }
    }

    // const updateUser = async (e, id) => {
    //     try {
    //         e.preventDefault();
    //         if (document.getElementById('name').value.trim().length <= 0 || document.getElementById('color').value.trim().length <= 0
    //             || document.getElementById('price').value.trim().length <= 0 || document.getElementById('quantity').value.trim().length <= 0
    //             || document.getElementById('categoryid').value.trim().length <= 0 || document.getElementById('description').value.trim().length <= 0
    //         ) {
    //             alert("Cần nhập thông tin");
    //             return;
    //         }
    //         const res = await axios.put(User_Rest_API_URL + `/put/${id}`, {
    //             categoryId: user.categoryId,
    //             color: user.color,
    //             name: user.name,
    //             description: user.description,
    //             code: user.code,
    //             price: user.price,
    //             quantity: user.quantity,
    //             created: user.created
    //         })
    //         setState({
    //             lstUser: [...lstUser, res.data]
    //         })
    //         componentDidMount();
    //         clear();
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const toggle = () => {
        toggleModal()
        setUser({})
        setImageUpload('')
    }


    return (
        <div>
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
                                                <option value='2'>
                                                    Nhân viên
                                                </option>
                                                <option value='1'>
                                                    Quản Lý
                                                </option>
                                                <option value='3'>
                                                    Khách hàng
                                                </option>
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