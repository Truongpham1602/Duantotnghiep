import React from "react";
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
const Register = () => {
  // return (
  //   <>
  //     <h1>Login</h1>
  //     <Row>
  //       <Col md={4}></Col>
  //       <Col md={4}>
  //       <Form>
  //         <FormGroup>
  //           <Input
  //             id="exampleEmail"
  //             name="email"
  //             placeholder="Email"
  //             type="email"
  //           />
  //         </FormGroup>
  //         <FormGroup>
  //           <Input
  //             id="examplePassword"
  //             name="password"
  //             placeholder="Password"
  //             type="password"
  //           />
  //         </FormGroup>
  //       </Form>
  //       </Col>
  //       <Col md={4}></Col>
  //     </Row>
  //     <Button color="info">Đăng nhập</Button>
  //   </>
  // )
  return (
    <div className="login">

    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign up</h2>

              <MDBInput wrapperClass='mb-4 w-100' placeholder="Fullname" id='formControlLg' type='fullname' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Email" id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Password" id='formControlLg' type='password' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Telephone" id='formControlLg' type='telephone' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Address" id='formControlLg' type='address' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Image" id='formControlLg' type='file' size="lg"/>
              <hr className="my-2" />
              <NavLink className="navbar-brand ps-2" to="/login" >Đã có tài khoản?</NavLink>
              <hr className="my-2" />
              <Button color="primary" to="/login">
              Sign up
             </Button>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </div>
  );
}

export default Register;