import { React, useState } from "react";
import axios from "axios";
import { Await, useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import "../css/login.css";
import { Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

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
  const notifySuccess = (text) => {
    toast.success(text, styleToast)
  };
  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
  };
  const notifyError = (text) => {
    toast.error(text, styleToast);
  };

  const handleOnchangeInput = (e, id) => {
    let copyUser = { ...user };
    copyUser[id] = e.target.value;
    setUser({ ...copyUser });
  };
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", null,

        { params: { userEmail: user.userEmail, password: user.password } });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);
      console.log(res.data);
      if (res.data.role === "CUSTOMER") {
        notifySuccess("Đăng nhập thành công")
        navigate("/");
      } else {
        notifySuccess("Đăng nhập thành công")
        navigate("/admin");
      }
    } catch (error) {
      notifyError("Đăng nhập thất bại")
      console.log(error);
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <MDBContainer fluid style={{ height: "40rem" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-500 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => handleOnchangeInput(e, "userEmail")}
                  value={user.userEmail}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => handleOnchangeInput(e, "password")}
                  value={user.password}
                  type="password"
                  size="lg"
                />

                <hr className="my-2" />
                <NavLink className="navbar-brand ps-2" to="/register">
                  Đăng ký tài khoản
                </NavLink>
                <hr className="my-2" />

                <Button color="primary" onClick={() => handleButton()}>
                  Đăng nhập
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
