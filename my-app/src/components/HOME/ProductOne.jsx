import { React, useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, Input, FormGroup, Label, } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { useOutletContext, useNavigate } from "react-router-dom";
// import '../css/styles.css';
import '../css/productOne.css';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import { padding } from "@mui/system";

const ProductOne = () => {
    const [nextProductDetail, addToCart, product] = useOutletContext()
    const imagesListRef = ref(storage, "images/");
    const [imageUrls, setImageUrls] = useState([]);
    const sizes = [
        {
            id: 36,
            title: 36
        },
        {
            id: 37,
            title: 37
        },
        {
            id: 38,
            title: 38
        },
        {
            id: 39,
            title: 39
        },
        {
            id: 40,
            title: 40
        },
        {
            id: 41,
            title: 41
        },
        {
            id: 42,
            title: 42
        },
        {
            id: 43,
            title: 43
        },
        {
            id: 44,
            title: 44
        },
        {
            id: 45,
            title: 45
        },
        {
            id: 46,
            title: 46
        },
    ]
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
    // const bigImgClick = () => {
    //     document.querySelector(".product-content-left-big-img").style.display = "none"
    // }

    const binhluanClick = () => {
        document.querySelector(".product-buttom-right-content-chiTiet").style.display = "none"
        document.querySelector(".product-buttom-right-content-binhLuan").style.display = "block"
    }
    const chitietClick = () => {
        document.querySelector(".product-buttom-right-content-chiTiet").style.display = "block"
        document.querySelector(".product-buttom-right-content-binhLuan").style.display = "none"
    }
    const button1Click = () => {
        document.querySelector(".product-buttom-right-content-big").classList.toggle("activeB")
    }

    return (
        <section className="productOne">
            <div className="container">
                <div className="product-top">
                    {/* <p>Home</p> <span>Giày Nam</span> */}
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                        <BreadcrumbItem active>Data</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="product-content row">
                    <div className="product-content-left row col-lg-7">
                        <div className="product-content-left-big-img" style={{ padding: '0px 2% 0px 0px' }}>
                            {imageUrls.map((img, index1) => {
                                return (
                                    product.medias.map((item, index2) => {
                                        return (
                                            <>
                                                {index2 === 0 && img.nameImg === item.url &&
                                                    <img src={img.url} style={{ height: '460px', width: '97%' }} />
                                                }
                                            </>
                                        )
                                    })
                                )
                            })}
                        </div>
                        <div className="product-content-left-small-img">
                            {imageUrls.map((img, index1) => {
                                return (
                                    product.medias.map((item, index2) => {
                                        return (
                                            <>
                                                {index2 > 0 &&
                                                    img.nameImg === item.url &&
                                                    <img src={img.url} style={{ height: '115px', width: '115px', padding: '3px 0px 3px 0px' }} />
                                                }
                                            </>
                                        )
                                    })
                                )
                            })}
                        </div>
                    </div>
                    <div className="product-content-right col-lg-5">
                        <div className="product-content-right-product-name">
                            <h1>{product.name}</h1>
                        </div>
                        <div className="product-content-right-product-price">
                            <p>{product.price} VND<sup></sup></p>
                        </div>
                        {/* <div className="product-content-right-product-color">
                            <p className="color"><span className="colorOne">Màu Sắc: </span>Xanh cổ vịt nhạt <span style={{ color: 'red' }}>*</span></p>
                        </div> */}
                        <div className="product-content-right-product-size row">
                            <div className="col-lg-1">
                                <p className="SizeOne">Size:</p>
                            </div>
                            <div className="col-lg-11 size">
                                {sizes.map((item, index1) => {
                                    return (
                                        product.sizes.map((size, index2) => {
                                            return (
                                                <>
                                                    {item.id == size.size && size.quantity > 0 &&
                                                        <button className="btn select">{item.title}</button>
                                                    }
                                                    {item.id == size.size && size.quantity <= 0 &&
                                                        <button className="btn" style={{ borderColor: 'white' }} disabled>{item.title}</button>
                                                    }
                                                    {item.id != size.size &&
                                                        <button className="btn" style={{ borderColor: 'white' }} disabled>{item.title}</button>
                                                    }

                                                </>
                                            )
                                        })
                                    )
                                })}
                            </div>
                        </div>
                        <div className="product-content-right-product-quantity">
                            <p className="quantityLeft">Số Lượng: <NumericInput min={0} /></p>
                        </div>
                        <div className="product-content-right-product-button">
                            <button class="fas fa-cart-arrow-down btnGioHang" onClick={() => addToCart()}> Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
                <div className="product-buttom-right">
                    <div className="product-buttom-right-top button1" onClick={() => button1Click()}>
                        &#8744;
                    </div>
                    <div className="product-buttom-right-content-big">
                        <div className="product-buttom-right-content-title row">
                            {/* <div className="product-buttom-right-content-title-item chitiet col-lg-2" onClick={() => chitietClick()}>
                                <p>Thông tin sản phẩm</p>
                            </div>
                            <div className="product-buttom-right-content-title-item-bl binhluan col-lg-2" onClick={() => binhluanClick()}>
                                <p>Bình luận</p>
                            </div> */}
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#" onClick={() => chitietClick()}>Thông tin sản phẩm</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={() => binhluanClick()}>Bình luận</a>
                                </li>
                            </ul>
                        </div>
                        <div className="product-buttom-right-content">
                            <div className="product-buttom-right-content-chiTiet">
                                <ul className="info-policy">
                                    <li>
                                        <div className="iconL">
                                            <img data-src="https://cdn.tgdd.vn/ValueIcons/14/Bao-quan-nhiet-do-thuong.png" class=" ls-is-cached lazyloaded" src="https://cdn.tgdd.vn/ValueIcons/14/Bao-quan-nhiet-do-thuong.png"></img>
                                        </div>
                                        <p>Bảo quản nơi khô ráo, thoáng mát, tránh các loại nấm mốc</p>
                                    </li>
                                    <li>
                                        <div className="iconL">
                                            <img data-src="https://cdn.tgdd.vn/ValueIcons/14/Tranh-mat-troi.png" class=" ls-is-cached lazyloaded" src="https://cdn.tgdd.vn/ValueIcons/14/Tranh-mat-troi.png"></img>
                                        </div>
                                        <p>Tránh phơi trực tiếp dưới ánh nắng mặt trời</p>
                                    </li>
                                    <li>
                                        <div className="iconL">
                                            <img data-src="https://cdn.tgdd.vn/ValueIcons/14/Dung-khan-mem.png" class=" ls-is-cached lazyloaded" src="https://cdn.tgdd.vn/ValueIcons/14/Dung-khan-mem.png"></img>
                                        </div>
                                        <p>Vệ sinh bằng khăn ẩm, mềm</p>
                                    </li>
                                    <li>
                                        <div className="iconL">
                                            <img data-src="https://cdn.tgdd.vn/ValueIcons/14/chat-tay-rua-nhe.png" class=" ls-is-cached lazyloaded" src="https://cdn.tgdd.vn/ValueIcons/14/chat-tay-rua-nhe.png"></img>
                                        </div>
                                        <p>Sử dụng chất tẩy rửa nhẹ</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-buttom-right-content-binhLuan" style={{ display: 'none' }}>
                                <div className="product-buttom-right-content-binhLuan-textarea">
                                    <FormGroup>
                                        <Input
                                            id="description"
                                            name="description"
                                            type="textarea"
                                            size='lg'
                                        />
                                    </FormGroup>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex w-25">
                                        <span className="mt-2">Evaluate: </span>
                                        &nbsp;
                                        &nbsp;
                                        <input className="form-control w-25" type="number" min="1" max="5" />
                                        &nbsp;
                                        &nbsp;
                                        <span className="mt-2">Star</span>
                                    </div>
                                    <div>
                                        <a className="btn btn-info btn-sm btn-block px-0 text-white"
                                            style={{ width: '12rem', }}>Send</a>
                                    </div>
                                </div>
                                <br />
                                <div className="tab-content mb-5">
                                    <div className="tab-pane fade show active">
                                        <div className="p-4 p-lg-5 bg-white">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="media mb-3">
                                                        <img className="rounded-circle" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="" width="50" />
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 text-uppercase">FullName</h6>
                                                            <p className="small text-muted mb-0 text-uppercase">dd/mm/yyyy</p>
                                                            <ul className="list-inline mb-1 text-xs">
                                                                <li className="list-inline-item m-0"><i className="star1"></i></li>
                                                                <li className="list-inline-item m-0"><i className="star2"></i></li>
                                                                <li className="list-inline-item m-0"><i className="star3"></i></li>
                                                                <li className="list-inline-item m-0"><i className="star4"></i></li>
                                                                <li className="list-inline-item m-0"><i className="star5"></i></li>
                                                            </ul>
                                                            <p className="text-small mb-0 text-muted">content</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
export default ProductOne;