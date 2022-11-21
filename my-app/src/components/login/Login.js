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
}
  from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import '../css/login.css';
import { Button } from "reactstrap";
const Login = () => {
  const [user, setUser] = useState({})

  const handleOnchangeInput = (e, id) => {
    let copyUser = { ...user }
    copyUser[id] = e.target.value
    setUser({ ...copyUser })
  }
  const navigate = useNavigate()

  const handleButton = async (e) => {
    try {
      let res = await axios.post("http://localhost:8080/auth/login", user)
      const user = res.data && res ? res.data : []
      if (user) {
        localStorage.setItem("longtest", JSON.stringify(res.data));
        navigate('/')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">

      <MDBContainer fluid style={{ height: '40rem' }}>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-500 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Sign in</h2>

                <MDBInput wrapperClass='mb-4 w-100' placeholder="Email" id='email' onChange={(e) => handleOnchangeInput(e, 'email')} value={user.email} type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Password" id='password' onChange={(e) => handleOnchangeInput(e, 'password')} value={user.password} type='password' size="lg" />
                <hr className="my-2" />
                <NavLink className="navbar-brand ps-2" to="/register" >Đã có tài khoản?</NavLink>
                <hr className="my-2" />
                <Button color="primary">
                  Sign in
                </Button>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default Login;