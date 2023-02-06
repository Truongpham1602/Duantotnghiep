import { React, useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import {
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCallGetAPI from "../../customHook/CallGetApi";
const User_Rest_API_URL = 'http://localhost:8080/nofilter';
const Register = (props) => {
  const { updateData, uploadFile, imageUpload } = props;
  // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  // const [updateData, setUpdateData] = useState(props);
  // const { data: lstUser } = useCallGetAPI(`http://localhost:8080/admin/user/findAll`);
  const [fillAll, setfillAll] = useState({});
  useEffect(() => {
    const Data = async () => {
      try {
        let lstUser1 = await axios.get(`http://localhost:8080/nofilter/findAll`);
        setfillAll(lstUser1.data)
        console.log(lstUser1.data);
      } catch (error) {
        console.log(error);
        notifyError("Đăng ký lỗi")
      }
    }
    Data()
  }, []);


  const notifySuccess = (text) => {
    toast.success(text, styleToast)
  };
  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
  };
  const notifyError = (text) => {
    toast.error(text, styleToast);
  };

  const [user, setUser] = useState({
    fullName: "",
    password: "",
    email: "",
    telephone: "",
    address: "",
    roleId: 2,
    image: "",
    status: 1,
  });

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

  const [check, setCheck] = useState({ fullName: '' });

  const handleOnchangeInput = (event, id) => {
    const copyUser = { ...user };
    if (id === 'image') {
      copyUser[id] = event.target.files[0].name;
    } else {
      copyUser[id] = event.target.value;
    }
    setUser({
      ...copyUser
    })
  }



  const createUser = () => {
    try {
      let validForm = true;
      let checkr = { ...check };
      const create = async () => {
        if (
          user.fullName?.trim().length <= 0 &&
          user.password?.trim().length <= 0 &&
          user.email?.trim().length <= 0 &&
          user.telephone?.trim().length <= 0 &&
          user.address?.trim().length <= 0
        ) {
          checkr["fullName"] = "Fullname không để trống"
          checkr["password"] = "Password không để trống"
          checkr["email"] = "Email không để trống"
          checkr["telephone"] = "Telephone không để trống"
          checkr["address"] = "Address không để trống"
          setCheck({ ...checkr })
          return;
        }
        if (user.fullName?.trim().length <= 0) {
          checkr["fullName"] = "Fullname không để trống"
          setCheck({ ...checkr })
          validForm = false;
        }
        if (user.password?.trim().length <= 0) {
          checkr["password"] = "Password không để trống"
          setCheck({ ...checkr })
          validForm = false;
        }
        if (user.email?.trim().length <= 0) {
          checkr["email"] = "Email không để trống"
          setCheck({ ...checkr })
          validForm = false;
        }
        if (user.telephone?.trim().length <= 0) {
          checkr["telephone"] = "Telephone không để trống"
          setCheck({ ...checkr })
          validForm = false;
        }
        if (user.address?.trim().length <= 0) {
          checkr["address"] = "Address không để trống"
          setCheck({ ...checkr })
          validForm = false;
        }
        let checkEmail = true
        let checkPhone = true
        fillAll.map(item => {
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
          let res = await axios.post(User_Rest_API_URL + '/post', {
            role: {
              id: user.roleId,
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
            status: user.status
          })
          let data = (res && res.data) ? res.data : []
          data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
          if (data.modified > 0) {
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
          }
          updateData(data, `create`)
          notifySuccess("Đăng ký thành công")
        }
      }
      create()
    } catch (error) {
      notifyError("Đăng ký thất bại")
      console.log(error)
    }
  }


  return (
    <div className="login">
      <ToastContainer />
      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Đăng ký</h2>

                <MDBInput wrapperClass='mb-4 w-100' placeholder="Fullname" id='formControlLg' type='fullname' size="lg"
                  value={user.fullName}
                  onChange={(event) => handleOnchangeInput(event, 'fullName')}
                />
                {check.fullName && check.fullName.length > 0 && (
                  <p className="checkError1">{check.fullName}</p>
                )}
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Email" id='formControlLg' type='email' size="lg"
                  value={user.email}
                  onChange={(event) => handleOnchangeInput(event, 'email')}
                />
                {check.email && check.email.length > 0 && (
                  <p className="checkError1">{check.email}</p>
                )}
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Password" id='formControlLg' type='password' size="lg"
                  value={user.password}
                  onChange={(event) => handleOnchangeInput(event, 'password')}
                />
                {check.password && check.password.length > 0 && (
                  <p className="checkError1">{check.password}</p>
                )}
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Telephone" id='formControlLg' type='telephone' size="lg"
                  value={user.telephone}
                  onChange={(event) => handleOnchangeInput(event, 'telephone')}
                />
                {check.telephone && check.telephone.length > 0 && (
                  <p className="checkError1">{check.telephone}</p>
                )}
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Address" id='formControlLg' type='address' size="lg"
                  value={user.address}
                  onChange={(event) => handleOnchangeInput(event, 'address')}
                />
                {check.address && check.address.length > 0 && (
                  <p className="checkError1">{check.address}</p>
                )}
                <hr className="my-2" />
                <NavLink className="navbar-brand ps-2" to="/login" >Đăng nhập</NavLink>
                <hr className="my-2" />
                <Button color="primary" onClick={(e) => { createUser(e) }}>
                  Đăng ký
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