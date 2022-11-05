import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import useCallGetAPI from '../../customHook/CallGetApi';
import {
  Table
} from 'reactstrap';

// class User extends React.Component {
const User = () => {

  const [user, setUser] = useState({});
  const [dataUser, setData] = useState([]);

  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)

  const updateData = (res, type) => {
    if (type === 'create') {
      let copydata = dataUser;
      copydata.unshift(res);
      console.log(copydata);
      setData(copydata);
      console.log(dataUser);
    }
    else if (type === 'update') {
      let copydata = dataUser;
      let getIndex = copydata.findIndex((p) => { return p.id === res.id });
      copydata.fill(res, getIndex, getIndex + 1);
      console.log(copydata);
      setData(copydata)
      console.log(dataUser);
    }
  }

  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/user/index`);
  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro)
      console.log(dataPro);
    }
    // setData(dataPro)
    // console.log(isLoading);
  }, [dataPro])

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
      />
      <UpdateUser
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
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
              <th>FullName</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Address</th>
              <th>Image</th>
              {/* <th>Created</th> */}
              <th>Creator</th>
              {/* <th>Modified</th> */}
              <th>Modifiter</th>
              <th>Status</th>
              <th>Role</th>
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
                    <td id="description">{item.image}</td>
                    {/* <td id="created">{item.created}</td> */}
                    <td id="modified">{item.creator}</td>
                    {/* <td id="created">{item.modified}</td> */}
                    <td id="modified">{item.modifier}</td>
                    <td id="modified">{item.status}</td>
                    <td id="modified">{item.nameRole}</td>
                    {/* <td id="image">
                                                <image src={`image/${item.id}`} width="150" height="170" />
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


/* <div class="row">
    <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/users/index?page=0" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/users/index?page=${ data.number<=0? 0 : data.number -1 }" aria-label="Previous">
          Previous
          </a>
        </li>
    <c:forEach var="i" begin="0" end="${ data.totalPages - 1 }">
        <li class="page-item">
            <a class="page-link"
                href="/su22b1_IT16306_sof3021/admin/users/index?page=${ i }">
                ${ i + 1 }
            </a>
        </li>
    </c:forEach>
     <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/users/index?page=${ data.number>=data.totalPages - 1? data.totalPages - 1 : data.number +1 }" aria-label="Previous">
          Next
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/users/index?page=${ data.totalPages - 1 }">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
    </ul>
</div>
    <div class="modal fade" id="ModalCreateCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-danger fw-bold" id="exampleModalLabel">Delete_Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form class="row g-3 align-items-center" id="update-form-category" action="/su22b1_IT16306_sof3021/admin/categories/store_p" method="POST" >
            <div class="col-md-12">
            <label  class="form-label">Name</label> 
                 <input class="form-control" type="text" name="name" id="name">
            </div>
        <div class="col-md-12"><button class="btn form-control btn-outline-success mt-2" id="create_cg">Save</button></div>
       </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="ModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-danger fw-bold" id="exampleModalLabel">Update_Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form class="row g-3 align-items-center" id="update-form" action="/su22b1_IT16306_sof3021/admin/users/update" 
       method="POST" enctype="multipart/form-data">
            <div class="col-md-12 form-group">
                <label  class="form-label" for="name">Name</label> 
                 <input class="form-control" type="text" name="name" id="name">
                 <span class="form-message" style="color: #f33a58"></span>
            </div>
            <div class="col-md-12 form-group">
             <label  class="form-label">Price</label> 
                 <input class="form-control" type="text" name="price" id="price">
                 <span class="form-message" style="color: #f33a58"></span>
                </div>
                 <div class="col-md-12 form-group">
            <label class="form-label">CreatedDate</label>
             <input class="form-control" type="date" name="createdDate" id="createdDate">
             <span class="form-message" style="color: #f33a58"></span>
             </div>
             <div class="col-md-12 form-group">
                 <label  class="form-label">Available</label> 
                 <select name = "available" id = "available" class="form-select" >
                    <option value="1">Còn hàng</option>
                    <option value="0">Chưa có hàng</option>
                 </select>
                 </div>
                 <div class="col-md-10 form-group">
                 <label  class="form-label">Category</label> 
                 <select name = "category" id = "categoryud" class="form-select" >
                      <c:forEach items="${ category }" var="c">
                    <option value="${ c.id }">${ c.name }</option>
                      </c:forEach>
                 </select>
                 </div>
                 <div class="col-2">
                 <label class="form-label">Thêm</label>
                 <a class="btn btn-danger form-control" data-bs-dismiss="modal" id="update_category">+</a>
                 </div>
                 <div class="col-md-12 form-group">
                 <label  class="form-label">Photo</label> 
                 <input class="form-control" type="file" name="img" id="img">
                 </div>
        <div class="col-md-12"><button class="btn form-control btn-outline-success mt-2">Update</button></div>
       </form>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="ModalDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-danger fw-bold" id="exampleModalLabel">Delete_Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form id="delete-form" action="/admin/users/delete" method="GET" >
                Bạn muốn xóa?
           <div class="row"><button class="btn btn-outline-danger mt-2">Delete</button></div>
       </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-danger fw-bold" id="exampleModalLabel">Create_Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form class="row g-3 align-items-center" id="create-form" action="/su22b1_IT16306_sof3021/admin/users/store" 
       method="POST" enctype="multipart/form-data">
            <div class="col-md-12 form-group">
            <label  class="form-label">Name</label> 
                 <input class="form-control" type="text" name="name" id="name">
                <span class="form-message" style="color: #f33a58"></span>
            </div>
            <div class="col-md-12 form-group">
             <label  class="form-label">Price</label> 
                 <input class="form-control" type="text" name="price" id="price">
                <span class="form-message" style="color: #f33a58"></span>
                </div>
                 <div class="col-md-12 form-group">
            <label class="form-label">CreatedDate</label>
             <input class="form-control" type="date" name="createdDate" id="createdDate">
            <span class="form-message" style="color: #f33a58"></span>
             </div>
             <div class="col-md-12 form-group">
                 <label  class="form-label">Available</label> 
                     <select name = "available" id = "available" class="form-select" >
                        <option value="1">Còn hàng</option>
                        <option value="0">Chưa có hàng</option>
                     </select>
                 </div>
                 <div class="col-md-10 form-group">
                 <label  class="form-label">Category</label> 
                 <select name = "category" id = "category" class="form-select" >
                      <c:forEach items="${ category }" var="c">
                          <option value="${ c.id }">${ c.name }</option>
                      </c:forEach>
                 </select>
                 </div>
                 <div class="col-2 form-group">
                 <label class="form-label">Thêm</label>
                 <a class="btn btn-danger form-control" data-bs-dismiss="modal" id="create_category">+</a>
                 </div>
                 <div class="col-md-12 form-group">
                 <label  class="form-label">Photo</label> 
                 <input class="form-control" type="file" name="img" id="img">
                 </div>
        <div class="col-md-12"><button class="btn form-control btn-outline-success mt-2">Save</button></div>
       </form>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
$(document).ready(function(){
    $(".update").click(function(){
        Validator({
             form: '#update-form',
             formGroupSelector: '.form-group',
             errorSelector: '.form-message',
             rules: [
               Validator.isRequired('#name', 'Vui lòng nhập tên User'),
               Validator.isRequired('#price', 'Vui lòng nhập Price'),
               Validator.isPrice('#price', 'Price không đúng định dạng'),
               Validator.isRequired('#createdDate', 'Vui lòng chọn Date')
             ]
           });
    var id=$(this).closest("tr").find("#id").text();
    $("#update-form").attr("action", "/su22b1_IT16306_sof3021/admin/users/update/" + id);
	
    var name=$(this).closest("tr").find("#name").text();
    $("#ModalUpdate").find("#name").val(name);
	
    var price=$(this).closest("tr").find("#price").text();
    $("#ModalUpdate").find("#price").val(price);
	
    var createdDate=$(this).closest("tr").find("#createdDate").text();
    $("#ModalUpdate").find("#createdDate").val(createdDate);

    var available=$(this).closest("tr").find("#available").text();
    $("#ModalUpdate").find("#available").val(available);
	
    var op = document.getElementById("categoryud");
    var category=$(this).closest("tr").find("#category").text();
    for (var i = 0; i < op.options.length; i++) {
        if (op.options[i].text == category) {
            op.options[i].selected = true;
        }
    }
	
	
    $("#ModalUpdate").modal("show");
    })
	
    $(".delete").click(function(){
        var id=$(this).closest("tr").find("#id").text();
        $("#ModalDelete").modal("show");
        $("#delete-form").attr("action", "/su22b1_IT16306_sof3021/admin/users/delete/" + id);
    })
    $(".create").click(function(){
        Validator({
             form: '#create-form',
             formGroupSelector: '.form-group',
             errorSelector: '.form-message',
             rules: [
               Validator.isRequired('#name', 'Vui lòng nhập tên User'),
               Validator.isRequired('#price', 'Vui lòng nhập Price'),
               Validator.isPrice('#price', 'Price không đúng định dạng'),
               Validator.isRequired('#createdDate', 'Vui lòng chọn Date'),
             ]
           });
        var id=$(this).closest("tr").find("#id").text();
        $("#ModalCreate").modal("show");
    })
    document.getElementById("create_category").onclick = function(){
        $("#ModalCreateCategory").modal("show");
    }
    document.getElementById("update_category").onclick = function(){
        $("#ModalCreateCategory").modal("show");
    }
})
</script> */



