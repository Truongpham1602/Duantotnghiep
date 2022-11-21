import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


// class UpdateProduct extends Component {
const UpdateProduct = (props) => {
    const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    const { isUpdateModal, toggleModal, updateData } = props;
    const [product, setProduct] = useState(props.product);

    useEffect(() => {
        setProduct(props.product)
    }, [props.product])

    const handleOnchangeInput = (event, id) => {
        let copyProduct = { ...product };
        copyProduct[id] = event.target.value;
        setProduct({
            ...copyProduct
        })
    }


    const updateProduct = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/admin/product/put/${product.id}`, {
                categoryId: product.categoryId,
                color: product.color,
                name: product.name,
                description: product.description,
                code: product.code,
                price: product.price,
                quantity: product.quantity,
                created: product.created
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
        setProduct({})
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
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder=""
                                        type="text"
                                        value={product.name}
                                        onChange={(event) => handleOnchangeInput(event, 'name')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="color">
                                        Color
                                    </Label>
                                    <Input
                                        id="color"
                                        name="color"
                                        placeholder=""
                                        type="text"
                                        value={product.color}
                                        onChange={(event) => handleOnchangeInput(event, 'color')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="price">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder=""
                                        type="text"
                                        value={product.price}
                                        onChange={(event) => handleOnchangeInput(event, 'price')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="quantity">
                                        Quantity
                                    </Label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        placeholder=""
                                        type="text"
                                        value={product.quantity}
                                        onChange={(event) => handleOnchangeInput(event, 'quantity')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col md={10}>
                                        <FormGroup>
                                            <Label for="category">
                                                Category
                                            </Label>
                                            <Input
                                                id="category"
                                                name="category"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeInput(event, 'categoryId')}
                                            >
                                                <option value='1'>
                                                    1
                                                </option>
                                                <option value='2'>
                                                    2
                                                </option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={1}>
                                        <Label for="category">
                                            Thêm
                                        </Label>
                                        <Button color="secondary">
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        type="textarea"
                                        size='lg'
                                        value={product.description}
                                        onChange={(event) => handleOnchangeInput(event, 'description')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateProduct(); handleOnchangeInput(e, 'category'); handleOnchangeInput(e, 'size') }}>
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

export default UpdateProduct;