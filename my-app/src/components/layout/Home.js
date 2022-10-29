import React from "react";
import Nav from './NavPage';
import HeaderPage from './HeaderPage';
// class Home extends React.Component {
const Home = () => {


    const ProductList = [];



    return (
        <>
            <Nav />
            <HeaderPage />
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th colspan="2">Action</th>
                            <th colspan="1">
                                <button class="btn btn-primary create" id="create" onClick={(e) => this.createProduct(e)}>Create</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ProductList && ProductList.length > 0 &&
                            ProductList.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td id="id">{item.id}</td>
                                        <td id="name">{item.name}</td>
                                        <td id="category">{item.color}</td>
                                        <td id="price">{item.price}</td>
                                        <td id="createdDate">{item.quantity}</td>
                                        <td id="category">{item.name_cate}</td>
                                        <td id="available">{item.description}</td>
                                        {/* <td id="image">
                                                <image src={`image/${item.id}`} width="150" height="170" />
                                            </td> */}
                                        <td>
                                            <button class="btn btn-primary update" type='buttom' id="update" onClick={(e) => this.editProduct(e, item.id)}>Edit</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-primary update" type='buttom' id="update" onClick={(e) => this.updateProduct(e, item.id)}>Update</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-danger delete" id="delete" onClick={(e) => this.deleteProduct(e, item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;