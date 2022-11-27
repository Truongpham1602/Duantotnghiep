import { React ,useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import moment from 'moment'
import '../css/detailsUser.css';
const UserDetails = (props) => {
    const timelineClick = () => {
        document.querySelector(".about-content").style.display = "none"
        document.querySelector(".timeline").style.display = "block"
    }

    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    

    const aboutClick = () => {
        document.querySelector(".about-content").style.display = "block"
        document.querySelector(".timeline").style.display = "none"
    }
    const { isUserDetailModal, toggleModal ,updateData} = props;


    const updateUser = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/admin/user/put/${user.id}`, user)
            let data = (res && res.data) ? res.data : [];
            data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
            updateData(data, 'update')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <Modal isOpen={isUserDetailModal} toggle={toggleModal} size='xl' centered>
                <ModalHeader toggle={toggleModal}>User Details</ModalHeader>
                <ModalBody>
                    <div class=" emp-profile">
                        <form method="post">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="profile-img" style={{ height: '100%', width: '100%' }}>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                        <div class="file btn btn-lg btn-primary">
                                            Change Photo
                                            <input type="file" name="file" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-7">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="profile-head">
                                                <h3  >
                                                    Phạm văn Trường
                                                </h3>
                                                <p class="proile-rating">id:123</p>
                                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={() => aboutClick()}>About</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={() => timelineClick()}>Timeline</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="tab-content profile-tab" id="myTabContent">
                                                <div class="tab-pane fade show active about-content" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Email</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>truong162@gmail.com</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Phone</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>123 456 7890</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Address</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Hà Nội</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show timeline" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Role</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Staff</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>created</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>18/10/2022</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Creator</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Trần Văn A</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Modified</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>10/11/2022</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Modifier</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Trần Văn A</p>
                                                        </div>
                                                    </div>
                                                    {/* <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Availability</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>6 months</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label>Your Bio</label><br />
                                                            <p>Your detail description</p>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UserDetails;