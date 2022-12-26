import { React, useState, useEffect } from "react";
import NumericInput from "react-numeric-input";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../css/CartPage.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import axios from "axios";
import useCallGetAPI from "../../customHook/CallGetApi";
import {
  Table,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { async } from "@firebase/util";

const Order = (props) => {
  const [lstproduct, setLstProduct] = useState([]);
  const { data: dataOrder, isLoading } = useCallGetAPI(
    `http://localhost:8080/api/order/findAll`
  );
  const [lstOrder, setLstOrder] = useState([]);
  const [source, setSource] = useState();
  const [number, setNumber] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const statuses = [
    {
      id: 1,
      checked: false,
    },
    {
      id: 2,
      checked: false,
    },
    {
      id: 3,
      checked: false,
    },
    {
      id: 0,
      checked: false,
    },
  ];
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    setLstOrder([]);
    dataOrder.map((item) => {
      let copydata = [...statuses];
      let getIndex = statuses.findIndex((p) => {
        return p.id == item.status;
      });
      let data = { id: item.status, checked: true };
      copydata.fill(data, getIndex, getIndex + 1);
      item["statuses"] = copydata;
      setLstOrder((prev) => [...prev, item]);
    });
    let imagesListRef = ref(storage, "images/");
    setImageUrls([]);
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        let nameImg = item.name;
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    });
  }, [dataOrder]);

  const updatedata = (res) => {
    let data = res ? res.data : {};
    let copydata = [...lstOrder];
    let getIndex = copydata.findIndex((p) => {
      return p.id == data.id;
    });

    // setStatuses
    let lstStatus = [...statuses];
    let getIndexStatus = lstStatus.findIndex((p) => {
      return p.id == data.status;
    });
    let statuschecked = { id: data.status, checked: true };
    lstStatus.fill(statuschecked, getIndexStatus, getIndexStatus + 1);

    //setStatuses to Order
    data["statuses"] = lstStatus;
    copydata.fill(data, getIndex, getIndex + 1);
    setLstOrder(copydata);
  };

  const toggle = () => {
    setIsModal(!isModal);
  };

  const [check, setCheck] = useState({});

  const setStatusOrder = async () => {
    if (check.id == 3) {
      if (check.status == 2) {
        let res = await axios.get(
          `http://localhost:8080/api/order/delivered/${check.order_Id}`
        );
        updatedata(res);
        toast.success("Status change successful", styleToast);
        return;
      } else if (check.status == 0) {
        toast.error("Order has been cancelled", styleToast);
        return;
      } else if (check.status == check.id) {
        return;
      }
      check.e.preventDefault();
      toast.error("The order has not been paid", styleToast);
    } else if (check.id == 0) {
      if (check.status == 3) {
        toast.error("Order has been delivered", styleToast);
        return;
      }
      let res = await axios.get(
        `http://localhost:8080/api/order/cancel/${check.order_Id}`
      );
      updatedata(res);
      toast.success("Canceled order successfully", styleToast);
    }
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


  return (
    <>
      <ToastContainer />
      <Table bordered>
        <thead style={{ verticalAlign: "middle" }}>
          <tr>
            <th>Mã</th>
            <th>Tên người nhận</th>
            {/* <th>Price</th> */}
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Ngày đặt</th>
            <th>Mô tả</th>
            <th>Chờ thanh toán</th>
            <th>Đã thanh toán</th>
            <th>Đã giao hàng</th>
            <th>ĐÃ hủy</th>
          </tr>
        </thead>
        <tbody style={{ verticalAlign: "middle" }}>
          {!isLoading &&
            lstOrder &&
            lstOrder.length > 0 &&
            lstOrder.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td id="category">{item.code}</td>
                  <td id="category">{item.nameRecipient}</td>
                  {/* <td id="price">{item.price}</td> */}
                  <td id="quantity">{item.telephone}</td>
                  <td id="category">{item.address}</td>
                  <td id="description">{item.created}</td>
                  <td id="description">{item.description}</td>
                  {item.statuses.map((item2) => {
                    if (
                      item2.checked == true &&
                      item2.id != 1 &&
                      item2.id != 2
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) =>
                              setCheck({
                                order_Id: item.id,
                                id: item2.id,
                                status: item.status,
                                e: e,
                              })
                            }
                            checked
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == true &&
                      item2.id != 0 &&
                      item2.id != 3
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) => {
                              setStatusOrder(item.id, item2.id, item.status);
                              toggle();
                            }}
                            checked
                            disabled
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == false &&
                      item2.id != 0 &&
                      item2.id != 3
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) =>
                              setStatusOrder(item.id, item2.id, item.status)
                            }
                            disabled
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == false &&
                      item2.id != 1 &&
                      item2.id != 2
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) => {
                              toggle();
                              setCheck({
                                order_Id: item.id,
                                id: item2.id,
                                status: item.status,
                                e: e,
                              });
                            }}
                            name={item.id}
                          />
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          {isLoading && (
            <tr>
              <h3>Vui lòng đợi...</h3>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={isModal} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>
          <h2>Cập nhập đơn hàng</h2>
        </ModalHeader>
        <ModalBody>
          {check.id == 3 && <h4>xác nhận giao hàng?</h4>}
          {check.id == 0 && <h4>xác nhận hủy?</h4>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setStatusOrder();
              toggle();
            }}
          >
            Ok
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Order;
