import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../Firebase";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


// class UpdateCategory extends Component {
const UpdateCategory = (props) => {
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];

    const { isUpdateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload, urlImg } = props;
    const [category, setCategory] = useState(props.category);

    useEffect(() => {
        setCategory(props.category)
    }, [props.category])

    const handleOnchangeInput = (event, id) => {
        let copyCategory = { ...category };
        if (id === 'image') {
            copyCategory[id] = event.target.files[0].name;
        } else {
            copyCategory[id] = event.target.value;
        }
        setCategory({
            ...copyCategory
        })
    }


    const updateCategory = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/admin/category/put/${category.id}`, {
                namecate: category.namecate,
                created: category.created,
                creator: category.creator,
                modified: category.modified,
                modifier: category.modifier,
            })
            let data = (res && res.data) ? res.data : [];
            data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
            toggle()
            updateData(data, 'update')
        } catch (error) {
            console.log(error.message)
        }
    }

    const toggle = () => {
        toggleModal()
        setCategory({})
    }

    return (
        <div>
            <Modal isOpen={isUpdateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Update</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        FullName
                                    </Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder=""
                                        type="text"
                                        value={category.namecate}
                                        onChange={(event) => handleOnchangeInput(event, 'namecate')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateCategory(); uploadFile(e) }}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateCategory;