import { React, useEffect, useState } from 'react';
import '../css/styles.css';
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

const ProductList = () => {
    const [nextProductDetail, addToCart, product, dataProduct, pageable, searchButton, totalPage, setKeyword, handleCate, top3ProBill, top5ProNew] = useOutletContext()
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        setImageUrls([])
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                let nameImg = item.name;
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { nameImg, url }]);
                });
            });
        });
    }, [])

    return (
        <div>
            <section class="product" id="product">
                <h1 class="heading">sản phẩm <span>mới nhất</span></h1>
                <div class="box-container">
                    {top5ProNew.map((item, index) => {
                        if (index <= 5) {
                            return (
                                <div class="box">
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
                        }
                    })}
                </div>
            </section>
            <section class="featured" id="fearured">
                <h1 class="heading">sản phẩm <span>bán chạy</span></h1>
                {top3ProBill.map(item => {
                    return (
                        <div class="row">
                            <div class="image-container">
                                <div className="product-content-left-big-img" style={{ padding: '0px 2% 0px 0px' }}>
                                    {imageUrls.map((img, index1) => {
                                        return (
                                            item.medias.map((item2, index2) => {
                                                return (
                                                    <>
                                                        {index2 === 0 && img.nameImg === item2.url &&
                                                            <img src={img.url} style={{ height: '260px', width: '87%' }} />
                                                        }
                                                    </>
                                                )
                                            })
                                        )
                                    })}
                                </div>
                                <div className="product-content-left-small-img">
                                    {item?.medias &&
                                        imageUrls.map((img, index1) => {
                                            return (
                                                item?.medias?.map((item3, index2) => {
                                                    return (
                                                        <>
                                                            {index2 > 0 &&
                                                                img.nameImg === item3.url &&
                                                                <img src={img.url} style={{ height: '90px', width: '115px', padding: '3px 0px 3px 0px' }} />
                                                            }
                                                        </>
                                                    )
                                                })
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div class="content">
                                <h3>Tên sản phẩm: {item.name}</h3>
                                <div class="stars">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="price">Giá: {item.price}</div>
                                {/* <div class="price">Số lượng: {item.quantity}</div> */}
                                <a class="btn" onClick={() => nextProductDetail(item.id)}>Add To Cart</a>
                            </div>
                        </div>
                    )
                })}


            </section>
        </div>
    );
}
export default ProductList;