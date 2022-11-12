import { React, useState } from 'react';
import axios from 'axios';
import moment from 'moment'

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


const Product_Rest_API_URL = 'http://localhost:8080/admin/product';

// class CreateProduct extends Component {
const CreateProduct = (props) => {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         product: {},
    //         size: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    //     }
    // }
    // const product = props.product;

    const { isCreateModal, toggleModal, updateData } = props;
    const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // const [updateData, setUpdateData] = useState(props);
    const [product, setProduct] = useState({});



    const handleOnchangeInput = (event, id) => {
        let copyProduct = { ...product };
        copyProduct[id] = event.target.value;
        setProduct({
            ...copyProduct
        })
    }

    // const editProduct = async (id) => {
    //     try {
    //         const res = await axios.get(Product_Rest_API_URL + `/find/${id}`)
    //         setState({
    //             product: res.data
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

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
            // setState({
            //     lstProduct: [...lstProduct, res.data],
            // })
            // props.updateData();
        } catch (error) {
            console.log(error)
        }
    }

    // const updateProduct = async (e, id) => {
    //     try {
    //         e.preventDefault();
    //         if (document.getElementById('name').value.trim().length <= 0 || document.getElementById('color').value.trim().length <= 0
    //             || document.getElementById('price').value.trim().length <= 0 || document.getElementById('quantity').value.trim().length <= 0
    //             || document.getElementById('categoryid').value.trim().length <= 0 || document.getElementById('description').value.trim().length <= 0
    //         ) {
    //             alert("Cần nhập thông tin");
    //             return;
    //         }
    //         const res = await axios.put(Product_Rest_API_URL + `/put/${id}`, {
    //             categoryId: product.categoryId,
    //             color: product.color,
    //             name: product.name,
    //             description: product.description,
    //             code: product.code,
    //             price: product.price,
    //             quantity: product.quantity,
    //             created: product.created
    //         })
    //         setState({
    //             lstProduct: [...lstProduct, res.data]
    //         })
    //         componentDidMount();
    //         clear();
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const toggle = () => {
        toggleModal()
        setProduct({})
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
                                    <Col md={10}>
                                        <FormGroup>
                                            <Label for="size">
                                                size
                                            </Label>
                                            <Input
                                                id="size"
                                                name="size"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeInput(event, 'size')}
                                            >
                                                {
                                                    size.map((item, index) => {
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
                    <Button color="primary" onClick={(e) => { createProduct(e); handleOnchangeInput(e, 'category'); handleOnchangeInput(e, 'size') }}>
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

export default CreateProduct;