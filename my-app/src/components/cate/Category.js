import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';
import { Pagination } from 'react-bootstrap';
import useCallGetAPI from '../../customHook/CallGetApi';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
  Row, Col, Form, PaginationLink, PaginationItem
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
  const [pageNumber, setPageNumber] = useState()
  const [totalPage, setTotalPage] = useState([])


  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro)
    }

    if (dataPro.content) {
      setData(dataPro.content)
      setPageNumber(dataPro.number)
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])

      }
    }
  }, [dataPro])

  const pageable = async (id) => {
    if (id <= 0) {
      id = 0
    } else if (id >= totalPage.length - 1) {
      id = totalPage.length - 1
    }
    const res = await axios.get(`http://localhost:8080/api/category/get?page=${id}`)
    let data = res ? res.data : []
    setData(data.content)
    setPageNumber(data.number)
    console.log(data.number);
  }

  const updateTotalPage = async () => {
    const res = await axios.get(`http://localhost:8080/api/category/get`)
    let data = res ? res.data : []
    if (data.totalPages > totalPage.length) {
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])
      }
    }
  }


  const updateData = (res, type) => {
    if (type === 'create') {
      let copydata = dataCategory;
      copydata.unshift(res);
      setData(copydata);
      updateTotalPage()
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
              <th colSpan='10'><h3>Loại sản phẩm</h3></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Tên thể loại</th>
              <th colspan="1">Action</th>
              <th colspan="1">
                <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Thêm</button>
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
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editCategory(item.id); updateModal() }}>Cập nhật</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => toggleNested(item.id)} >Xóa</button>

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
              <ModalHeader>Xóa</ModalHeader>
              <ModalBody>
                Bạn có chắc chắn xóa không?
              </ModalBody>
              <ModalFooter>
                <Button type='button' color="primary" onClick={() => { deleteCategory(cateId) }}>
                  Xóa
                </Button>{' '}
                <Button color="secondary" onClick={() => toggleNested()}>
                  Thoát
                </Button>
              </ModalFooter>
            </Modal>
            {isLoading &&
              <tr>
                <h3>Loading...</h3>
              </tr>
            }
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem>
            <PaginationLink
              first
              onClick={() => pageable(0)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(pageNumber - 1)}
              previous
            />
          </PaginationItem>
          {totalPage.map(item => {
            return (
              <PaginationItem>
                <PaginationLink onClick={() => pageable(item - 1)}>
                  {item}
                  {console.log(item)}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(pageNumber + 1)}
              next
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(totalPage.length - 1)}
              last
            />
          </PaginationItem>
        </Pagination>
      </div>
    </>
  )


}

export default Category;




