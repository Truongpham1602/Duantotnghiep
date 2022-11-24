import { React, useEffect, useState } from "react";
import '../css/productTest.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import useCallGetAPI from '../../customHook/CallGetApi';
import ProductShear from "../HOME/Productshear";

const ProductTest = () => {
    const [dataProduct, setData] = useState([]);
    const [nextProductDetail] = useOutletContext()
    const [imageUrls, setImageUrls] = useState([]);
    const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/product/index`);
    useEffect(() => {
        if (dataPro && dataPro.length > 0) {
            setData(dataPro)
            const imagesListRef = ref(storage, "images/");
            listAll(imagesListRef).then((response) => {
                response.items.forEach((item) => {
                    let nameImg = item.name;
                    getDownloadURL(item).then((url) => {
                        setImageUrls((prev) => [...prev, { nameImg, url }]);
                    });
                });
            });
        }
        // setData(dataPro)
        // console.log(isLoading);
    }, [dataPro])

    return (
        <div>
            {/* <h1 class="heading">latest <span>Products</span></h1> */}
            <section class="productTest" id="productTest">
                <div class="box-container">
                    {!isLoading &&
                        dataProduct.map((item, index) => {
                            return (
                                <div class="box" key={index}>
                                    <div class="content">
                                        {imageUrls.map((img) => {
                                            return (
                                                <>
                                                    {img.nameImg === item.image &&
                                                        <img src={img.url} style={{ width: "300px", height: "250px" }} />
                                                    }
                                                </>
                                            )
                                        })}
                                        <h3>{item.name}</h3>
                                        <div class="price">{item.price}</div>
                                        <div class="stars">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <div class="icons">
                                        <a href="#" class="fa fa-heart"></a>
                                        <a href="#" class="fa fa-cart-plus"></a>
                                        <a href="#" class="fa fa-eye"></a>
                                    </div>
                                    <a class="btn" onClick={() => nextProductDetail(item.id)}>Add To Cart</a>
                                </div>
                            )
                        })
                    }


                </div>
            </section>
        </div>
    );
}
export default ProductTest;