import { React, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { storage } from "../../Firebase";

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


const Category_Rest_API_URL = 'http://localhost:8080/admin/category';

// class CreateCategory extends Component {
const CreateCategory = (props) => {

    const { isCreateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload } = props;
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    // const [updateData, setUpdateData] = useState(props);
    const [category, setCategory] = useState({});



    const handleOnchangeInput = (event, id) => {
        const copyCategory = { ...category };
        if (id === 'image') {
            copyCategory[id] = event.target.files[0].name;
        } else {
            copyCategory[id] = event.target.value;
        }
        setCategory({
            ...copyCategory
        })
    }



    const createCategory = () => {
        try {
            const create = async () => {
                let res = await axios.post(Category_Rest_API_URL + '/post', {

                    namecate: category.namecate,
                    created: category.created,
                    creator: category.creator,
                    modified: category.modified,
                    modifier: category.modifier
                })
                let data = (res && res.data) ? res.data : []
                data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
                if (data.modified > 0) {
                    data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
                }
                updateData(data, `create`)
                toggle()
            }
            create()

        } catch (error) {
            console.log(error)
        }
    }


    const toggle = () => {
        toggleModal()
        setCategory({})
        setImageUpload('')
    }


    return (
        <div>
            <Modal isOpen={isCreateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Create</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        Name
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
                    <Button color="primary" onClick={(e) => { createCategory(e); uploadFile(e) }}>
                        Add New
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default CreateCategory;