import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { useForm } from "react-hook-form";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label,
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
    let [sizeSelect, setSizeSelect] = useState();
    const handleOnchangeinput = (event, id) => {
        let copyProduct = { ...product };
        copyProduct[id] = event.target.value;
        setProduct({
            ...copyProduct
        })
    }

    const createProduct = (data) => {
        try {
            const nums = [
                data.size1,
                data.size2,
                data.size3,
                data.size4,
                data.size5,
                data.size6,
                data.size7,
                data.size8,
                data.size9,
                data.size10,
            ];
            const newNums = nums.slice(0, sizeSelect);
            const hasDuplicate = newNums.some(x => newNums.indexOf(x) !== newNums.lastIndexOf(x));
            if (hasDuplicate) {
                // toast.warning("Nhập trùng size. Vui lòng nhập lại!");
                alert('Nhập trùng size')
            } else {
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
                    let datares = (res && res.data) ? res.data : []
                    datares.created = moment(datares.created).format('DD/MM/YYYY HH:mm:ss');
                    if (datares.modified > 0) {
                        datares.modified = moment(datares.modified).format('DD/MM/YYYY HH:mm:ss');
                    }

                    let datasize = [
                        {
                            productId: res.data.id,
                            size: data.size1,
                            quantity: data.quantity1
                        },
                        {
                            productId: res.data.id,
                            size: data.size2,
                            quantity: data.quantity2
                        },
                        {
                            productId: res.data.id,
                            size: data.size3,
                            quantity: data.quantity3
                        },
                        {
                            productId: res.data.id,
                            size: data.size4,
                            quantity: data.quantity4
                        }, {
                            productId: res.data.id,
                            size: data.size5,
                            quantity: data.quantity5
                        },
                        {
                            productId: res.data.id,
                            size: data.size6,
                            quantity: data.quantity6
                        },
                        {
                            productId: res.data.id,
                            size: data.size7,
                            quantity: data.quantity7
                        },
                        {
                            productId: res.data.id,
                            size: data.size8,
                            quantity: data.quantity8
                        },
                        {
                            productId: res.data.id,
                            size: data.size9,
                            quantity: data.quantity9
                        },
                        {
                            productId: res.data.id,
                            size: data.size10,
                            quantity: data.quantity10
                        },
                        {
                            productId: res.data.id,
                            size: data.size11,
                            quantity: data.quantity11
                        }
                    ].slice(0, sizeSelect)
                    console.log(datasize);
                    await axios.post(`http://localhost:8080/api/size/post`, datasize)
                    updateData(datares, `create`)
                    setSizeSelect()
                    toggle()
                }
                createPro()
            }
        } catch (error) {
            console.log(error)
        }

    }

    const toggle = () => {
        toggleModal()
        setProduct({})
    }

    const {
        register,
        handleSubmit
    } = useForm();

    const { ref } = register;



    const checkSize = async (e) => {
        let Select = e.target.value
        setSizeSelect(Select)
        setLstSizeSelect([])
        for (let i = 1; i <= Select; i++) {
            setLstSizeSelect((prev) => [...prev, i])
        }

    }

    return (
        <Modal isOpen={isCreateModal} toggle={() => toggle()}
            size='lg'
            centered
        >
            <Form onSubmit={handleSubmit(createProduct)} innerRef={ref}>
                <ModalHeader toggle={() => toggle()}>Create</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <div>
                                    <input style={{ width: '100%', borderRadius: '5px' }}
                                        id="name"
                                        name="name"
                                        placeholder=""
                                        type="text"
                                        value={product.name}
                                        onChange={(event) => handleOnchangeinput(event, 'name')}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="color">
                                    Color
                                </Label>
                                <div>
                                    <input style={{ width: '100%', borderRadius: '5px' }}
                                        id="color"
                                        name="color"
                                        placeholder=""
                                        type="text"
                                        value={product.color}
                                        onChange={(event) => handleOnchangeinput(event, 'color')}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="price">
                                    Price
                                </Label>
                                <div>
                                    <input style={{ width: '100%', borderRadius: '5px' }}
                                        id="price"
                                        name="price"
                                        placeholder=""
                                        type="text"
                                        value={product.price}
                                        onChange={(event) => handleOnchangeinput(event, 'price')}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="quantity">
                                    Quantity
                                </Label>
                                <div>
                                    <input style={{ width: '100%', borderRadius: '5px' }}
                                        id="quantity"
                                        name="quantity"
                                        placeholder=""
                                        type="text"
                                        value={product.quantity}
                                        onChange={(event) => handleOnchangeinput(event, 'quantity')}
                                    />
                                </div>
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
                                        <div>
                                            <select style={{ width: '100%', borderRadius: '5px' }}
                                                id="category"
                                                name="category"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeinput(event, 'categoryId')}
                                            >
                                                <option value='1'>
                                                    1
                                                </option>
                                                <option value='2'>
                                                    2
                                                </option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <Label for="category">
                                        Thêm
                                    </Label>
                                    <button style={{ width: '100%', borderRadius: '15px' }}>
                                        +
                                    </button>
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
                                        <div>
                                            <select style={{ width: '100%', borderRadius: '5px' }}
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
                                            </select>
                                        </div>
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
                                <div>
                                    <textarea style={{ width: '100%', borderRadius: '5px', height: '100px' }}
                                        id="description"
                                        name="description"
                                        onChange={(event) => handleOnchangeinput(event, 'description')}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    {lstsizeSelect.length >= 1 &&
                        <Row>
                            {lstsizeSelect.map((item) => {
                                return (
                                    <Col md={6}>
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="description">
                                                        Size
                                                    </Label>
                                                    <div>
                                                        <select style={{ width: '100%', borderRadius: '5px' }}
                                                            id="size"
                                                            name="size"
                                                            placeholder=""
                                                            type="select"
                                                            {...register(`size${item}`)}
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
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={8}>
                                                <FormGroup>
                                                    <Label for="description">
                                                        Quantity
                                                    </Label>
                                                    <div>
                                                        <input style={{ width: '100%', borderRadius: '5px' }}
                                                            {...register(`quantity${item}`)} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            }
                            )
                            }
                        </Row>
                    }
                </ModalBody >
                <ModalFooter>
                    <Button color="primary" type='submit'>
                        Add New
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form >
        </Modal >
    );

}

export default CreateProduct;