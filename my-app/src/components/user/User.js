import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
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

// class User extends React.Component {
const User = () => {

  const [user, setUser] = useState({});
  const [dataUser, setData] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)
  const [imageUrls, setImageUrls] = useState([]);
  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/user/index`);
  const imagesListRef = ref(storage, "images/");
  let [urlImg, setUrlImg] = useState();


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
      console.log(item.nameImg);
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
      let copydata = dataUser;
      copydata.unshift(res);
      setData(copydata);
    }
    else if (type === 'update') {
      let copydata = dataUser;
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


  const editUser = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/user/find/${id}`)
      setUser(res.data)
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

  const deleteUser = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/admin/user/delete/${id}`)
      let copyList = dataUser;
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
  //   setPage(page + 7 < dataUser.length / 7 ? page + 7 : page);
  // };
  // handleClickButtom = (event) => {
  //   event.preventDefault();
  //   setState({
  //     show: !state.show
  //   })
  // }





  return (
    <>
      <CreateUser
        isCreateModal={isCreateModal}
        toggleModal={createModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
      />
      <UpdateUser
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        urlImg={urlImg}
        user={user}
      />
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th colSpan='10'><h3>User</h3></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Image</th>
              <th colspan="1">Action</th>
              <th colspan="1">
                <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Create</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && dataUser && dataUser.length > 0 &&
              dataUser.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row" id="">
                      {index + 1}
                    </th>
                    <td id="category">{item.fullName}</td>
                    {/* <td id="category">{item.password}</td> */}
                    <td id="price">{item.email}</td>
                    <td id="quantity">{item.telephone}</td>
                    <td id="category">{item.address}</td>
                    {/* <td id="created">{item.created}</td> */}
                    {/* <td id="created">{item.modified}</td> */}
                    <td id="modified">{item.nameRole}</td>
                    <td id="image" >
                      {imageUrls.map((img) => {
                        return (
                          <>
                            {img.nameImg === item.image &&
                              <img width="70" height="65" src={img.url} />
                            }
                            {img.nameImg !== item.image &&
                              <image src='' />
                            }
                          </>
                        )

                      })}
                    </td>
                    {/* 
                      <img src={imageUrls} width="150" height="170" />
                    </td> */}
                    <td>
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editUser(item.id); updateModal() }}>Update</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => { deleteUser(item.id) }} >Delete</button>
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
        </Table>
      </div>
    </>
  )

}

export default User;




