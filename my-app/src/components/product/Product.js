import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import useCallGetAPI from '../../customHook/CallGetApi';
// import Tables from '../../customHook/Table';
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem, Table
} from 'reactstrap';

// class Product extends React.Component {
const Product = () => {

  const [product, setProduct] = useState({});
  const [dataProduct, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)

  const updateData = (res, type) => {
    if (type === 'create') {
      let copydata = dataProduct;
      copydata.unshift(res);
      console.log(copydata);
      setData(copydata);
      console.log(dataProduct);
    }
    else if (type === 'update') {
      let copydata = dataProduct;
      let getIndex = copydata.findIndex((p) => { return p.id === res.id });
      copydata.fill(res, getIndex, getIndex + 1);
      console.log(copydata);
      setData(copydata)
      console.log(dataProduct);
    }
  }

  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/product/index`);
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


  const editProduct = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/product/find/${id}`)
      setProduct(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteProduct = async (id) => {
    // e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/admin/product/delete/${id}`)
      let copyList = dataProduct;
      copyList = copyList.filter(item => item.id !== id)
      setData(copyList)
      // updateData(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  // handleClickButtom = (event) => {
  //   event.preventDefault();
  //   setState({
  //     show: !state.show
  //   })
  // }

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 7 < dataProduct.length / 7 ? page + 7 : page);
  };

  const [cate, setCate] = useState([
    {
      id: 1,
      name: 'cateparen1',
      parenid: ''
    },
    {
      id: 2,
      name: 'cateparen2',
      parenid: ''
    },
    {
      id: 3,
      name: 'cateparen3',
      parenid: ''
    },
    {
      id: 4,
      name: 'childrent1',
      parenid: 1
    },
    {
      id: 5,
      name: 'childrent3',
      parenid: 3
    },
    {
      id: 6,
      name: 'cateparen6',
      parenid: ''
    },
    {
      id: 7,
      name: 'childrent2',
      parenid: 2
    },
    {
      id: 8,
      name: 'childrent4',
      parenid: 4
    }
  ]);

  return (
    <>
      <CreateProduct
        isCreateModal={isCreateModal}
        toggleModal={createModal}
        updateData={updateData}
      />
      <UpdateProduct
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        product={product}
      />
      <div>
        <Table bordered>
          <thead style={{ verticalAlign: 'middle' }}>
            <tr>
              <th colSpan='10'><h3>Product</h3></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Color</th>
              {/* <th>Price</th> */}
              <th>Quantity</th>
              <th>Category</th>
              <th>Description</th>
              <th colspan="1">Action</th>
              <th colspan="1">
                <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Create</button>
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: 'middle' }}>
            {!isLoading && dataProduct && dataProduct.length > 0 &&
              Object.values(
                dataProduct.slice(7 * page, 7 * page + 7)
              ).map((item, index) => {
                return (
                  <tr key={item.id} onClick={() => { editProduct(item.id); updateModal() }}>
                    <th scope="row" id="">
                      {index + 1}
                    </th>
                    <td id="category">{item.name}</td>
                    <td id="category">{item.color}</td>
                    {/* <td id="price">{item.price}</td> */}
                    <td id="quantity">{item.quantity}</td>
                    <td id="category">{item.name_cate}</td>
                    <td id="description">{item.description}</td>
                    {/* <td id="image">
                                                <image src={`image/${item.id}`} width="150" height="170" />
                                            </td> */}
                    <td>
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editProduct(item.id); updateModal() }}>Update</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => { deleteProduct(item.id) }} >Delete</button>
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

export default Product;


/* <div class="row">
    <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/products/index?page=0" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/products/index?page=${ data.number<=0? 0 : data.number -1 }" aria-label="Previous">
          Previous
          </a>
        </li>
    <c:forEach var="i" begin="0" end="${ data.totalPages - 1 }">
        <li class="page-item">
            <a class="page-link"
                href="/su22b1_IT16306_sof3021/admin/products/index?page=${ i }">
                ${ i + 1 }
            </a>
        </li>
    </c:forEach>
     <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/products/index?page=${ data.number>=data.totalPages - 1? data.totalPages - 1 : data.number +1 }" aria-label="Previous">
          Next
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="/su22b1_IT16306_sof3021/admin/products/index?page=${ data.totalPages - 1 }">
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
       <form class="row g-3 align-items-center" id="update-form" action="/su22b1_IT16306_sof3021/admin/products/update" 
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
                 <div class="col-md-7 form-group">
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
       <form id="delete-form" action="/admin/products/delete" method="GET" >
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
       <form class="row g-3 align-items-center" id="create-form" action="/su22b1_IT16306_sof3021/admin/products/store" 
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
                 <div class="col-md-7 form-group">
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
               Validator.isRequired('#name', 'Vui lòng nhập tên Product'),
               Validator.isRequired('#price', 'Vui lòng nhập Price'),
               Validator.isPrice('#price', 'Price không đúng định dạng'),
               Validator.isRequired('#createdDate', 'Vui lòng chọn Date')
             ]
           });
    var id=$(this).closest("tr").find("#id").text();
    $("#update-form").attr("action", "/su22b1_IT16306_sof3021/admin/products/update/" + id);
	
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
        $("#delete-form").attr("action", "/su22b1_IT16306_sof3021/admin/products/delete/" + id);
    })
    $(".create").click(function(){
        Validator({
             form: '#create-form',
             formGroupSelector: '.form-group',
             errorSelector: '.form-message',
             rules: [
               Validator.isRequired('#name', 'Vui lòng nhập tên Product'),
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



