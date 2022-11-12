import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


const Product_Rest_API_URL = 'http://localhost:8080/admin/product';

const CreateProduct = (props) => {

    const { isCreateModal, toggleModal, updateData } = props;
    const sizeCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const size = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
    const [lstsizeSelect, setLstSizeSelect] = useState([]);
    const [product, setProduct] = useState({});
    const [lstSize, setLstSize] = useState([]);

    const handleOnchangeInput = (event, id) => {
        let copyProduct = { ...product };
        copyProduct[id] = event.target.value;
        setProduct({
            ...copyProduct
        })
    }

    const handleOnchangeInputSize = (event, id, key) => {
        let copyProduct = [...lstSize];
        copyProduct[key] = key;
        // copyProduct[key][id] = event.target.value;
        console.log(copyProduct);
        setLstSize([
            ...copyProduct
        ])
        console.log(lstSize);
    }


    const createProduct = () => {
        try {
            const createPro = async () => {
                let res = await axios.post(Product_Rest_API_URL + '/post', {
                    categoryId: product.categoryId,
                    color: product.color,
                    name: product.name,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    quantity: product.quantity
                })
                let data = (res && res.data) ? res.data : []
                data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
                if (data.modified > 0) {
                    data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
                }
                updateData(data, `create`)
                toggle()
            }
            createPro()
        } catch (error) {
            console.log(error)
        }
    }

    const toggle = () => {
        toggleModal()
        setProduct({})
    }

    const checkSize = (e) => {
        let sizeSelect = e.target.value
        setLstSizeSelect([])
        for (let i = 1; i <= sizeSelect; i++) {
            setLstSizeSelect((prev) => [...prev, i])
        }
    }

    return (
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
                        <Col md={6}>
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
                        <Col md={6}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="size">
                                            Số lượng size
                                        </Label>
                                        <Input
                                            id="size"
                                            name="size"
                                            placeholder=""
                                            type="select"
                                            onChange={(e) => { checkSize(e) }}
                                        >
                                            <option value=''>
                                                Chọn size
                                            </option>
                                            {
                                                sizeCheck.map((item, index) => {
                                                    return (
                                                        <option value={item}>
                                                            {item}
                                                        </option>
                                                    )
                                                })
                                            }

                                        </Input>
                                    </FormGroup>
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
                                    onChange={(event) => handleOnchangeInput(event, 'description')}
                                >
                                    {
                                        sizeCheck.map((size) => {
                                            return (
                                                <option value={size}>
                                                    {size}
                                                </option>
                                            )
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                {lstsizeSelect.length >= 1 &&
                    <Row>
                        {lstsizeSelect.map((item) =>
                            <Col md={6}>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="description">
                                                Size
                                            </Label>
                                            <Input
                                                id="size"
                                                name="size"
                                                placeholder=""
                                                type="select"
                                                size='lg'
                                                onChange={(event) => handleOnchangeInputSize(event, `size`, item)}
                                            >
                                                {
                                                    size.map((size) => {
                                                        return (
                                                            <option value={size}>
                                                                {size}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label for="description">
                                                Quantity
                                            </Label>
                                            <Input
                                                id="quantity"
                                                name="quantity"
                                                placeholder=""
                                                type="text"
                                                size='lg'
                                                onChange={(event) => handleOnchangeInputSize(event, `quantity`, item)}
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        )
                        }
                    </Row>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e) => { createProduct(e); handleOnchangeInput(e, 'category'); handleOnchangeInput(e, 'size') }}>
                    Add New
                </Button>
                <Button color="secondary" onClick={() => toggle()}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );

}

export default CreateProduct;