import { React, useState, useEffect } from 'react';
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


// class UpdateUser extends Component {
const UpdateUser = (props) => {
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];

    const { isUpdateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload, urlImg } = props;
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const handleOnchangeInput = (event, id) => {
        let copyUser = { ...user };
        if (id === 'image') {
            copyUser[id] = event.target.files[0].name;
        } else {
            copyUser[id] = event.target.value;
        }
        setUser({
            ...copyUser
        })
    }


    const arrRole = [
        {
            id: 2, title: 'Nhân viên'
        },
        {
            id: 3, title: 'Khách hàng'
        }
    ]

    const status = [
        {
            id: 1, title: 'Hoạt động'
        },
        {
            id: 2, title: 'Không hoạt động'
        }
    ]



    const updateUser = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/admin/user/put/${user.id}`, {
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
                trangthai: user.status
            })
            let data = (res && res.data) ? res.data : [];
            data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
            toggle()
            updateData(data, 'update')
        } catch (error) {
            console.log(error.message)
        }
    }

    const toggle = () => {
        toggleModal()
        setUser({})
    }

    return (
        <div>
            <Modal isOpen={isUpdateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Update</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        FullName
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
                        </Row>
                        <Row>
                            <Col md={6}>
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
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="image">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        placeholder=""
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
                                                Vai trò
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
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="Status">
                                            Trạng thái 
                                            </Label>
                                            <Input
                                                id="status"
                                                name="status"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeInput(event, 'status')}
                                            >
                                               {status.map(item => {
                                                        if (user.status === item.id) {
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
                                {!imageUpload &&
                                    <img width='100%' height='241rem' src={urlImg} />
                                }
                                {imageUpload &&
                                    <img width='100%' height='241rem' src={URL.createObjectURL(imageUpload)} />
                                }
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateUser(); uploadFile(e) }}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateUser;