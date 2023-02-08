import { React, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../user/User.css";
import moment from "moment";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
import Multiselect from "multiselect-react-dropdown";
import useCallGetAPI from "../../customHook/CallGetApi";

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

const User_Rest_API_URL = "http://localhost:8080/admin/user";

const notifyWarning = (text) => {
  toast.warning(text, styleToast);
};
const notifySuccess = (text) => {
  toast.success(text, styleToast);
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
};

// class CreateUser extends Component {
const CreateUser = (props) => {
  const token = localStorage.getItem('token');
  const { data: roles } = useCallGetAPI(
    `http://localhost:8080/role/get`
  );
  const [lstRole, setLstRole] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    setLstRole(roles);
  }, [roles]);

  const {
    isCreateModal,
    toggleModal,
    updateData,
    uploadFile,
    setImageUpload,
    imageUpload,
  } = props;
  // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  // const [updateData, setUpdateData] = useState(props);
  const { data: lstUser } = useCallGetAPI(`http://localhost:8080/admin/user/findAll`);

  const [user, setUser] = useState({
    fullName: "",
    password: "",
    email: "",
    telephone: "",
    address: "",
    roleId: '',
    image: "",
    status: 1,
  });
  const [check, setCheck] = useState({
    fullName: "",
    password: "",
    email: "",
    telephone: "",
    address: "",
  });

  // const arrRole = [
  //   {
  //     id: 2,
  //     title: "Nhân viên",
  //   },
  //   {
  //     id: 3,
  //     title: "Khách hàng",
  //   },
  // ];

  const handleOnchangeInput = (event, id) => {
    const copyUser = { ...user };
    let checkr = { ...check };
    copyUser[id] = event.target.value;
    const sdt = /((09|03|07|08|028|024|05)+([0-9]{8})\b)/g;
    const mail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    try {
      // console.log(new Date(new Date(copyVoucher["effectFrom"]).toDateString()) < new Date(new Date().toDateString()));
      if (id != "image") {
        if (copyUser[id] == 0) {
          if (id === 'fullName') checkr[id] = "Họ tên không được để trống"
          if (id === 'password') checkr[id] = "Mật khẩu không được để trống"
          if (id === 'email') checkr[id] = "Email không được để trống"
          if (id === 'telephone') checkr[id] = "Số điện thoại không được để trống"
          if (id === 'address') checkr[id] = "Địa chỉ không được để trống"
        } else if (id == 'email' && !mail.test(copyUser[id])) {
          checkr[id] = "Email không đúng định dạng"
        } else if (id == 'telephone' && !sdt.test(copyUser[id])) {
          checkr[id] = "Số điện thoại không đúng định dạng"
        } else {
          checkr[id] = ''
        }
        setCheck({ ...checkr })
      }
      if (id == "image") {
        if (copyUser["image"].trim().length <= 0) setImageUpload("");
      }
    } catch (error) {
      console.log(error);
    }

    if (id === "image") {
      copyUser[id] = event.target.files[0].name;
    } else {
      copyUser[id] = event.target.value;
    }
    setUser({
      ...copyUser,
    });
  };

  const createUser = () => {
    try {
      let validForm = true;
      let ch0 = { ...check };
      const create = async () => {
        if (
          user.fullName?.trim().length <= 0 &&
          user.password?.trim().length <= 0 &&
          user.email?.trim().length <= 0 &&
          user.telephone?.trim().length <= 0 &&
          user.address?.trim().length <= 0
        ) {
          ch0["fullName"] = "Họ tên không được để trống";
          ch0["password"] = "Mật khẩu không được để trống";
          ch0["email"] = "Email không được để trống";
          ch0["telephone"] = "Số điện thoại không được để trống";
          ch0["address"] = "Địa chỉ không được để trống";
          setCheck({ ...ch0 });
          return;
        }
        if (user.fullName.trim().length <= 0) {
          ch0["name"] = "Họ tên không được để trống";
          setCheck({ ...ch0 });
          validForm = false;
        }
        if (user.password.trim().length <= 0) {
          ch0["password"] = "Mật khẩu không được để trống";
          setCheck({ ...ch0 });
          validForm = false;
        }
        if (user.email.trim().length <= 0) {
          ch0["email"] = "Email không được để trống";
          setCheck({ ...ch0 });
          validForm = false;
        }
        if (user.telephone.trim().length <= 0) {
          ch0["telephone"] = "Số điện thoại không được để trống";
          setCheck({ ...ch0 });
          validForm = false;
        }
        if (user.address.trim().length <= 0) {
          ch0["address"] = "Địa chỉ không được để trống";
          setCheck({ ...ch0 });
          validForm = false;
        }
        let checkEmail = true
        let checkPhone = true
        lstUser.map(item => {
          if (item.telephone == user.telephone) {
            checkPhone = false
          } else if (item.email == user.email) {
            checkEmail = false
          }
        })
        if (!checkEmail) {
          notifyWarning('Email đã tồn tại!')
          return
        } if (!checkPhone) {
          notifyWarning('Số điện thoại đã tồn tại!')
          return
        }
        if (validForm) {

          let res = await axios.post(User_Rest_API_URL + "/post", {
            role: {
              id: user.roleId
            },
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
            status: user.status,
          },
            { headers: { "Authorization": `Bearer ${token}` } })
            .catch((error) => {
              if (error.response.status == 403) {
                notifyWarning("Bạn không có quyền thêm mới !!")
              }
            });
          let data = res && res.data ? res.data : [];
          data.created = moment(data.created).format("DD/MM/YYYY HH:mm:ss");
          if (data.modified > 0) {
            data.modified = moment(data.modified).format("DD/MM/YYYY HH:mm:ss");
          }
          updateData(data, `create`);
          toggle();
          notifySuccess("Thêm mới thành công");
        }
      };
      create();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggle = () => {
    toggleModal();
    setUser({
      fullName: "",
      password: "",
      email: "",
      telephone: "",
      address: "",
      roleId: 2,
      image: "",
      status: 1,
    });
    setImageUpload("");
  };

  return (
    <div>
      <ToastContainer />
      <Modal isOpen={isCreateModal} toggle={() => toggle()} size="lg" centered>
        <ModalHeader toggle={() => toggle()}>Thêm</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Họ tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder=""
                    type="text"
                    value={user.fullName}
                    onChange={(event) => handleOnchangeInput(event, "fullName")}
                  />
                  {check.fullName && check.fullName.length > 0 && (
                    <p className="checkError1">{check.fullName}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder=""
                    type="password"
                    value={user.password}
                    onChange={(event) => handleOnchangeInput(event, "password")}
                  />
                  {check.password && check.password.length > 0 && (
                    <p className="checkError1">{check.password}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder=""
                    type="email"
                    value={user.email}
                    onChange={(event) => handleOnchangeInput(event, "email")}
                  />
                  {check.email && check.email.length > 0 && (
                    <p className="checkError1">{check.email}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="image">Hình ảnh</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    // value={user.image}
                    onChange={(event) => {
                      handleOnchangeInput(event, "image");
                      setImageUpload(event.target.files[0]);
                    }}
                  />

                  {check.image && check.image.length > 0 && (
                    <p className="checkError1">{check.image}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="telephone">Số điện thoại</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        placeholder=""
                        type="text"
                        value={user.telephone}
                        onChange={(event) =>
                          handleOnchangeInput(event, "telephone")
                        }
                      />
                      {check.telephone && check.telephone.length > 0 && (
                        <p className="checkError1">{check.telephone}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder=""
                        type="text"
                        value={user.address}
                        onChange={(event) =>
                          handleOnchangeInput(event, "address")
                        }
                      />
                      {check.address && check.address.length > 0 && (
                        <p className="checkError1">{check.address}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="roleId">Quyền</Label>
                      <div>
                        <select
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          id="description"
                          name="description"
                          placeholder=""
                          type="select"
                          onChange={(event) =>
                            handleOnchangeInput(event, "roleId")
                          }
                        >
                          <option value="" disabled selected>
                            Chọn quyền
                          </option>
                          {lstRole.map((item, index) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.description}
                              </option>
                            );
                          })}
                        </select>
                        {check.roleId &&
                          check.roleId.length > 0 && (
                            <p className="checkError">{check.roleId}</p>
                          )}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                {imageUpload && (
                  <img
                    width="100%"
                    height="241rem"
                    src={URL.createObjectURL(imageUpload)}
                  />
                )}
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              createUser(e);
              uploadFile(e);
            }}
          >
            Thêm
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateUser;
