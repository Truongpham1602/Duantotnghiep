import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';
import CategoryDetails from './CategoryDetails';
import useCallGetAPI from '../../customHook/CallGetApi';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
  Row, Col, Form
} from 'reactstrap';
import {
  Table
} from 'reactstrap';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";

// class Category extends React.Component {
const Category = () => {

  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/api/category/get`);
  const [category, setCategory] = useState({});
  const [dataCategory, setData] = useState([]);
  const [nestedModal, setNestedModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)
  const [page, setPage] = useState(0);
  const [cateId, setCateId] = useState()


  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro)
    }
  }, [dataPro])


  const updateData = (res, type) => {
    if (type === 'create') {
      let copydata = dataCategory;
      copydata.unshift(res);
      setData(copydata);
    }
    else if (type === 'update') {
      let copydata = dataCategory;
      let getIndex = copydata.findIndex((p) => { return p.id === res.id });
      copydata.fill(res, getIndex, getIndex + 1);
      setData(copydata)
    }
  }


  const createModal = () => {
    setIsCreateModal(!isCreateModal)
  }

  const updateModal = () => {
    setisUpdateModal(!isUpdateModal)
  }

  //   const categoryDetailsModal = () => {
  //     setisCategoryDetailsModal(!isCategoryDetailModal)
  //   }

  const toggleNested = (id) => {
    setNestedModal(!nestedModal);
    console.log(id);
    id && setCateId(id)
  };

  const editCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/category/get/${id}`)
      setCategory(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteCategory = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/api/category/delete/${id}`)
      let copyList = dataCategory;
      copyList = copyList.filter(item => item.id !== id)
      setData(copyList)
      toggleNested()
      // updateData(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }


  // const onBack = () => {
  //   setPage(page - 1 > -1 ? page - 1 : page);
  // };

  // const onNext = () => {
  //   setPage(page + 7 < dataCategory.length / 7 ? page + 7 : page);
  // };


  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < dataCategory.length / 7 ? page + 1 : page);
  };



  return (
    <>
      {/* <CategoryDetails
        isCategoryDetailModal={isCategoryDetailModal}
        toggleModal={categoryDetailsModal}
      /> */}
      <CreateCategory
        isCreateModal={isCreateModal}
        toggleModal={createModal}
        updateData={updateData}
      />
      <UpdateCategory
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        category={category}
      />
      <div>
        <Table bordered >
          <thead style={{ verticalAlign: 'middle' }}>
            <tr>
              <th colSpan='10'><h3>Category</h3></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th colspan="1">Action</th>
              <th colspan="1">
                <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Create</button>
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: 'middle' }}>
            {!isLoading && dataCategory && dataCategory.length > 0 &&
              Object.values(
                dataCategory.slice(7 * page, 7 * page + 7)
              ).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row" id="">
                      {index + 1}
                    </th>
                    <td id="category">{item.namecate}</td>
                    <td>
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editCategory(item.id); updateModal() }}>Update</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => toggleNested(item.id)} >Delete</button>
                                
                    </td>
                  </tr>
                )
              })
            }
            <Modal
                  isOpen={nestedModal}
                  toggle={toggleNested}
                  // size='lg'
                >
                  <ModalHeader>Delete</ModalHeader>
                  <ModalBody>
                    Bạn có chắc chắn xóa không?
                  </ModalBody>
                  <ModalFooter>
                    <Button type='button' color="primary" onClick={() => { deleteCategory(cateId) }}>
                      Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={() =>toggleNested()}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
            {isLoading &&
              <tr>
                <h3>Loading...</h3>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='10'>
                <button className="hoverable" onClick={onBack}>
                  Back
                </button>
                <label style={{ margin: '0 10px' }}>{page + 1}</label>
                <button className="hoverable" onClick={onNext}>
                  Next
                </button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  )


}

export default Category;




