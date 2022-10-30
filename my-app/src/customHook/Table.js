import { React } from 'react';
import {
    Table
} from 'reactstrap';

const Tables = (data) => {



    <Table bordered>
        <thead>
            {data.map((item, index) => {
                return (
                    <th>STT</th>

                )
            })}
            <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Description</th>
                <th>CreateDate</th>
                <th>UpdateDate</th>
                <th colspan="1">Action</th>
                <th colspan="1">
                    <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Create</button>
                </th>
            </tr>
        </thead>
        <tbody>
            {!isLoading && dataProduct && dataProduct.length > 0 &&
                dataProduct.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row" id="">
                                {index + 1}
                            </th>
                            <td id="category">{item.name}</td>
                            <td id="category">{item.color}</td>
                            <td id="price">{item.price}</td>
                            <td id="quantity">{item.quantity}</td>
                            <td id="category">{item.name_cate}</td>
                            <td id="description">{item.description}</td>
                            <td id="created">{item.created}</td>
                            <td id="modified">{item.modified}</td>
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
    </Table>

}

export default Tables;