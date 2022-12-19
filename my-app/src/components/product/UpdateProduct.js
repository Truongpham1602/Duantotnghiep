import { React, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Form,
} from "reactstrap";

// class UpdateProduct extends Component {
const UpdateProduct = (props) => {
  const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  const { isUpdateModal, toggleModal, updateData } = props;
  const [product, setProduct] = useState(props.product);
  const [check, setCheck] = useState({});
  const [lstCate, setLstCate] = useState([]);
  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  const handleOnchangeinput = (event, id) => {
    let gia = /(([0-9]{6})\b)/g;
    let soluong = /(([0-9]{1})\b)/g;
    let chu = /[a-zA-Z]/g;
    let copyProduct = { ...product };
    copyProduct[id] = event.target.value;
    try {
      let ch0 = { ...check };
      if (id == "name") {
        // if (chu.test(event.target.value) == false) {
        //   ch0["name"] = "Sai định dạng";
        // } else {
        //   if (product.name.trim().length == 0) {
        //     ch0["name"] = "Tên không được để trống";
        //   } else {
        //     ch0[id] = "";
        //   }
        // }
        if (product.name.length == 0) {
          ch0["name"] = "Tên không được để trống";
        } else {
          if (chu.test(event.target.value) == false) {
            ch0["name"] = "Sai định dạng";
          } else {
            ch0[id] = "";
          }
        }
        setCheck({
          ...ch0,
        });
      } else {
        if (id == "color") {
          if (chu.test(event.target.value) == false) {
            ch0["color"] = "Sai định dạng";
          } else {
            if (product.color.trim().length == 0) {
              ch0["color"] = "Màu không được để trống";
            } else {
              ch0[id] = "";
            }
          }
        } else if (id == "price") {
          if (gia.test(event.target.value) == false) {
            ch0["price"] = "giá sản phẩm phải là số";
          } else {
            ch0["price"] = "";
          }
        } else if (id == "quantity") {
          if (soluong.test(event.target.value) == false) {
            ch0["quantity"] = "Số lượng sản phẩm phải là số";
          } else {
            ch0["quantity"] = "";
          }
        } else if (id == "namecate") {
          if (copyProduct[id] == 0) {
            ch0["namecate"] = "Tên danh mục không được để trống";
          } else {
            ch0["namecate"] = "";
          }
        } else if (id == "sizes") {
          if (copyProduct[id] == 0) {
            ch0["sizes"] = "Số lượng kích cỡ không được để trống";
          } else {
            ch0["sizes"] = "";
          }
        } else if (id == "medias") {
          if (copyProduct[id] == 0) {
            ch0["medias"] = "Ảnh không được để trống";
          } else {
            ch0["medias"] = "";
          }
        } else {
          ch0[id] = "";
        }
        setCheck({
          ...ch0,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setProduct({
      ...copyProduct,
    });
  };

  const updateProduct = async () => {
    try {
      let ch0 = { ...check };
      if (product.name.trim().length == 0) {
        ch0["name"] = "Tên không được để trống";
        setCheck({ ...ch0 });
        return;
      } else if (product.color.trim().length == 0) {
        ch0["color"] = "Màu sắc không được để trống";
        setCheck({ ...ch0 });
        return;
      } else if (product.price.trim().length == 0) {
        ch0["price"] = "Giá không được để trống";
        setCheck({ ...ch0 });
        return;
      } else if (product.quantity.trim().length == 0) {
        ch0["quantity"] = "Số lượng không được để trống";
        setCheck({ ...ch0 });
        return;
      } else if (product.name_cate.length == 0) {
        ch0["namecate"] = "Hãy chọn danh mục";
        setCheck({ ...ch0 });
        return;
      } else if (product.sizes.length == 0) {
        ch0["sizes"] = "Hãy chọn số lượng cỡ giày";
        setCheck({ ...ch0 });
        return;
      } else if (product.medias.length == 0) {
        ch0["medias"] = "Hãy chọn ảnh";
        setCheck({ ...ch0 });
        return;
      } else if (product.medias.length > 5) {
        ch0["medias"] = "Số lượng ảnh không được lớn hơn 5";
        setCheck({ ...ch0 });
        return;
      } else if (
        check.name.trim().length > 0 ||
        check.color.trim().length > 0 ||
        check.price.trim().length > 0 ||
        check.quantity.trim().length > 0 ||
        check.namecate.length > 0 ||
        check.sizes.length > 0 ||
        check.description.trim().length > 0 ||
        check.medias.length > 0
      ) {
        return;
      }
      const res = await axios.put(
        `http://localhost:8080/admin/product/put/${product.id}`
        // {
        //   categoryId: product.categoryId,
        //   color: product.color,
        //   name: product.name,
        //   namecate: product.namecate,
        //   sizes: product.sizes,
        //   medias: product.medias,
        //   description: product.description,
        //   code: product.code,
        //   price: product.price,
        //   quantity: product.quantity,
        // }
      );
      let data = res && res.data ? res.data : [];
      data.created = moment(data.created).format("DD/MM/YYYY HH:mm:ss");
      data.modified = moment(data.modified).format("DD/MM/YYYY HH:mm:ss");
      toggle();
      updateData(data, "update");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggle = () => {
    toggleModal();
    setProduct({});
  };

  return (
    <div>
      <Modal isOpen={isUpdateModal} toggle={() => toggle()} size="lg" centered>
        <ModalHeader toggle={() => toggle()}>Cập nhật</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Tên</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder=""
                    type="text"
                    value={product.name}
                    onChange={(event) => handleOnchangeinput(event, "name")}
                  />
                  {check.name && check.name.length > 0 && (
                    <p className="checkError">{check.name}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="color">Màu</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder=""
                    type="text"
                    value={product.color}
                    onChange={(event) => handleOnchangeinput(event, "color")}
                  />
                  {check.color && check.color.length > 0 && (
                    <p className="checkError">{check.color}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="price">Giá</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder=""
                    type="text"
                    value={product.price}
                    onChange={(event) => handleOnchangeinput(event, "price")}
                  />
                  {check.price && check.price.length > 0 && (
                    <p className="checkError">{check.price}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="quantity">Số lượng</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder=""
                    type="text"
                    value={product.quantity}
                    onChange={(event) => handleOnchangeinput(event, "quantity")}
                  />
                  {check.quantity && check.quantity.length > 0 && (
                    <p className="checkError">{check.quantity}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={10}>
                    <FormGroup>
                      <Label for="categoryId">Danh mục</Label>
                      <div>
                        <select
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          id="categoryId"
                          name="categoryId"
                          placeholder=""
                          type="select"
                          //value={product.namecate}
                          onChange={(event) =>
                            handleOnchangeinput(event, "categoryId")
                          }
                        >
                          {lstCate.map((item, index) => {
                            if (item.id === product.categoryId) {
                              return (
                                <option key={index} value={item.id} selected>
                                  {item.namecate}
                                </option>
                              );
                            }
                            return (
                              <option key={index} value={item.id}>
                                {item.namecate}
                              </option>
                            );
                          })}
                        </select>
                        {check.namecate && check.namecate.length > 0 && (
                          <p className="checkError">{check.namecate}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                    <Label for="category">Thêm</Label>
                    <Button color="secondary">+</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">Mô tả</Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    size="lg"
                    value={product.description}
                    onChange={(event) =>
                      handleOnchangeinput(event, "description")
                    }
                  />
                  {check.description && check.description.length > 0 && (
                    <p className="checkError">{check.description}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              updateProduct();
              handleOnchangeinput(e, "category");
              handleOnchangeinput(e, "size");
            }}
          >
            Lưu
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateProduct;
