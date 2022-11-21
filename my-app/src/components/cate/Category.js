import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';
import CategoryDetails from './CategoryDetails';
import useCallGetAPI from '../../customHook/CallGetApi';
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

  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/category/index`);
  const [category, setCategory] = useState({});
  const [dataCategory, setData] = useState([]);
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)
  const [isCategoryDetailModal, setisCategoryDetailsModal] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  let [urlImg, setUrlImg] = useState();
  const imagesListRef = ref(storage, "images/");
  const [page, setPage] = useState(0);


  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro)
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          let nameImg = item.name;
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, { nameImg, url }]);
          });
        });
      });
    }
  }, [dataPro])


  const uploadFile = () => {
    if (imageUpload == null) return;
    let check = true;
    imageUrls.map(item => {
      if (imageUpload.name === item.nameImg)
        return check = false
    })
    if (check === true) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        let nameImg = imageUpload.name
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    }

  };


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


  const editCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/category/find/${id}`)
      setCategory(res.data)
      {
        imageUrls.map((img) => {
          if (img.nameImg === res.data.image) {
            return setUrlImg(img.url)
          }
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteCategory = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/admin/category/delete/${id}`)
      let copyList = dataCategory;
      copyList = copyList.filter(item => item.id !== id)
      setData(copyList)
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
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
      />
      <UpdateCategory
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        urlImg={urlImg}
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
                    {/* <td id="category">{item.password}</td> */}
                    {/* <td id="price">{item.email}</td>
                    <td id="quantity">{item.telephone}</td>
                    <td id="category">{item.address}</td> */}
                    {/* <td id="created">{item.created}</td> */}
                    {/* <td id="created">{item.modified}</td> */}
                    {/* <td id="modified">{item.nameRole}</td>
                    <td id="image" >
                      {imageUrls.map((img) => { */}
                        {/* return (
                          <>
                            {img.nameImg === item.image &&
                              <img width="70" height="65" src={img.url} />
                            }
                            {img.nameImg !== item.image &&
                              <image src='' />
                            } */}
                          {/* </>
                        )
                      })}
                    </td> */}
                    {/* 
                      <img src={imageUrls} width="150" height="170" />
                    </td> */}
                    <td>
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editCategory(item.id); updateModal() }}>Update</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => { deleteCategory(item.id) }} >Delete</button>
                    </td>
                  </tr>
                )
              })
            }

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




