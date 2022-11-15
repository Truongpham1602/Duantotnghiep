import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import useCallGetAPI from '../../customHook/CallGetApi';
import { useForm } from "react-hook-form";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label,
    Row, Col, Form, Input
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product_Rest_API_URL = 'http://localhost:8080/admin/product';

const CreateProduct = (props) => {

    const { isCreateModal, toggleModal, updateData } = props;
    const sizeCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const size = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
    const [lstsizeSelect, setLstSizeSelect] = useState([]);
    const [product, setProduct] = useState({});
    const [lstSize, setLstSize] = useState([]);
    let [sizeSelect, setSizeSelect] = useState(0);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const { data: cates } = useCallGetAPI(`http://localhost:8080/api/category/get`);
    const [lstCate, setLstCate] = useState([]);
    const [cate, setCate] = useState()

    const handleOnchangeinput = (event, id) => {
        let copyProduct = { ...product };
        copyProduct[id] = event.target.value;
        setProduct({
            ...copyProduct
        })
    }

    useEffect(() => {
        setLstCate(cates)
    }, [cates])

    const notifySuccess = (text) => {
        toast.success(text, styleToast)
    };
    const notifyWarning = (text) => {
        toast.warning(text, styleToast);
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

    const createProduct = (data) => {
        try {
            if (product.name.trim().length <= 0 || product.color.trim().length <= 0
                || product.price.trim().length <= 0 || product.quantity.trim().length <= 0
            ) {
                notifyWarning("Cần nhập thông tin")
                return
            } else if (sizeSelect <= 0) {
                notifyWarning("Chưa chọn size")
                return
            }
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
                notifyWarning("Size bị trùng, vui lòng chọn lại!");
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
                    notifySuccess("Thêm thành công")
                }
                createPro()
            }
        } catch (error) {
            notifyWarning("Cần nhập thông tin")
            console.log(error)
        }

    }

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
        setCate()
    };
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
        setCate()
    };

    const toggle = () => {
        toggleModal()
        setProduct({})
        setLstSizeSelect([])
    }

    const {
        register,
        handleSubmit
    } = useForm();

    const { ref } = register;



    const checkSize = (e) => {
        let Select = e.target.value
        setSizeSelect(Select)
        setLstSizeSelect([])
        for (let i = 1; i <= Select; i++) {
            setLstSizeSelect((prev) => [...prev, i])
        }

    }

    const createCate = async () => {
        try {
            let res = await axios.post('http://localhost:8080/api/category/create', { namecate: cate })
            let data = (res && res.data) ? res.data : {}
            let copydata = lstCate
            if (res.data) {
                copydata.unshift(data);
                setLstCate(copydata);
                notifySuccess('Thêm mới cate thành công')
                toggleNested()
            }
        } catch (error) {
            notifyError('Thêm mới thất bại!')
            console.log(error);
        }
    }

    return (
        <>
            <ToastContainer />
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
                                        <input style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                        <input style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                        <input style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                        <input style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                                <select style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
                                                    id="category"
                                                    name="category"
                                                    placeholder=""
                                                    type="select"
                                                    onChange={(event) => handleOnchangeinput(event, 'categoryId')}
                                                >
                                                    {lstCate.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.id}>
                                                                {item.namecate}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <Label for="category">
                                            Thêm
                                        </Label>
                                        <button type='button' style={{ border: '1px solid', width: '100%', borderRadius: '15px' }} onClick={toggleNested}>
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
                                                <select style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                        <textarea style={{ border: '1px solid', width: '100%', borderRadius: '5px', height: '100px' }}
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
                                                            <select style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                                                            <input style={{ border: '1px solid', width: '100%', borderRadius: '5px' }}
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
                <Modal
                    isOpen={nestedModal}
                    toggle={toggleNested}
                    onClosed={closeAll ? toggle : undefined}
                    // size='lg'
                    centered
                >
                    <ModalHeader>Thêm category</ModalHeader>
                    <ModalBody>
                        <Input id="namecate"
                            placeholder="Name Category"
                            name="namecate"
                            onChange={(event) => setCate(event.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type='button' color="primary" onClick={() => { createCate() }}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleNested}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Modal >

        </>

    );

}

export default CreateProduct;