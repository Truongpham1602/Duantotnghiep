import axios from 'axios';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import moment from 'moment';
import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storage } from '../../Firebase';
import { STATUS_ORDER, styleToast } from '../common/const';
import OrederClientTemplate from './orderClient.template'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface OrderItem {
    id: number,
    code: String,
    address: String,
    created: String,
    paymentAtDate: String,
    recaiveAtDate: String,
    completedAtDate: String,
    nameRecipient: String,
    status: number,
    statusName: string,
    telephone: String,
}

export interface OrderDetailItem {
    id: number,
    color_Product: String,
    image: string,
    imageUrl: string,
    orderId: number,
    name_Product: String,
    quantity: number,
    sizeId: number,
    sizeName: String,
    voucherId: number,
    price: number
}

export interface OrderState {
    isLoading: Boolean,
    lstOrder: OrderItem[],
    isModal: boolean,
    orderDetailItem: OrderItem,
    orderDetailList: OrderDetailItem[],
    images: any[],
    totalPrice: number,
}

export default class OrderClientComponent extends React.Component {
    // create state
    state = {
        isLoading: false,
        lstOrder: [],
        isModal: false,
        orderDetailItem: {} as OrderItem,
        orderDetailList: [],
        images: [],
        totalPrice: 0,
    } as OrderState


    // Get token
    token = localStorage.getItem('token');
    // Config header request
    config = {
        headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        }
    }

    /**
     * componentDidMount
     * call init
    */
    componentDidMount(): void {
        this.init()
    }

    /**
     * function call api init
    */
    init = async () => {

        // Set Loadding
        this.setState({
            ...this.state,
            isLoading: true
        })

        // Call Api userLogin
        const user = await axios.get(`http://localhost:8080/auth/information`, this.config
        );
        // Call Api order/findAll
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/order/findOrderBySize_ID/?user_Id=${user.data.id}&telephone=${0}`, this.config
        );

        console.log(res.data)

        // Map lstOrder
        const lstOrder = res.data && res.data.map((item: OrderItem) => {
            let statusName = ''
            switch (item.status) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    statusName = STATUS_ORDER[item.status]
                    break
            }
            return {
                ...item,
                created: moment(item.created as any).format('DD/MM/YYYY HH:mm:ss'),
                statusName,
            }
        })

        // Get list image
        const imagesListRef = ref(storage, "images/");
        listAll(imagesListRef).then((response) => {
            let images = [] as any[]
            response.items.forEach((item, index) => {
                getDownloadURL(item).then((url) => {
                    images.push({
                        nameImg: item.name,
                        url,
                    })

                    if (index === response.items.length - 1) {
                        // Set state
                        this.setState({
                            ...this.state,
                            images,
                        })
                    }
                });
            });
        });

        // Set state
        this.setState({
            ...this.state,
            lstOrder: lstOrder,
            isLoading: false,
        })

    }

    /**
     * 
     * @returns 
     * Render Template
     */
    render() {
        return (
            <>
                <div style={{ textAlign: 'left', paddingLeft: '5%' }}>
                    <Link className="" to={"/"}>
                        Trang Chủ
                    </Link> /
                    <Link className="" to={"/order"}>
                        Đơn hàng
                    </Link> /
                    <Link className="" to={"/order/type3"}>
                        Lịch sử đặt hàng
                    </Link>
                </div>
                <OrederClientTemplate self={this} />
            </>
        )
    }


    /**
     * 
     * @param id 
     * Delivered order
     */
    handCompletedOrder = (id: number) => {
        confirmAlert({
            title: '',
            message: 'Xác nhận hoàn tất đơn hàng!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let res = await axios.get(
                            `${process.env.REACT_APP_API_KEY}/order/completed/${id}`, this.config
                        );
                        if (res.status === 200) {
                            toast.success("Xác nhận thành công", styleToast);
                            this.init()
                        } else {
                            toast.error("Xác nhận thất bại", styleToast);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                },
            ]
        });

    }

    /**
     * 
     * @param id 
     * open Modal Detail Order
     */
    openModalDetail = async (id: Number) => {
        // Call Api order/find/id
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/order/find/${id}`, this.config
        ) as any;

        // Call Api order/find/id
        const resDetail = await axios.get(
            `${process.env.REACT_APP_API_KEY}/orderDetail/findByOrder_Id/${id}`, this.config
        );

        let totalPrice = 0
        const orderDetailList = resDetail.data.map((item: any) => {
            totalPrice += item.price * item.quantity
            return {
                ...item,
                imageUrl: this.getUrlImage(item.image)
            }
        })

        this.setState({
            ...this.state,
            isModal: true,
            orderDetailItem: {
                ...res.data,
                created: moment(res.data.created as any).format('DD/MM/YYYY HH:mm:ss'),
                paymentAtDate: res.data.paymentAtDate ? moment(res.data.paymentAtDate as any).format('DD/MM/YYYY HH:mm:ss') : '',
                completedAtDate: res.data.completedAtDate ? moment(res.data.completedAtDate as any).format('DD/MM/YYYY HH:mm:ss') : '',
                recaiveAtDate: res.data.recaiveAtDate ? moment(res.data.recaiveAtDate as any).format('DD/MM/YYYY HH:mm:ss') : ''
            },
            orderDetailList,
            totalPrice,
        })
    }

    /**
     * close modal detail
     */
    closeModalDetail = () => {
        this.setState({
            ...this.state,
            isModal: false,
        })
    }

    paymentOrder = async (id: number,) => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/order/find/${id}`, this.config
        ) as any;

        // Call Api order/find/id
        const resDetail = await axios.get(
            `${process.env.REACT_APP_API_KEY}/orderDetail/findByOrder_Id/${id}`, this.config
        );

        let totalPrice = 0
        const orderDetailList = resDetail.data.map((item: any) => {
            totalPrice += item.price * item.quantity
            return {
                ...item,
                imageUrl: this.getUrlImage(item.image)
            }
        })

        window.location.href = `http://localhost:8080/thanh-toan-vnpay?amount=${totalPrice}&bankcode=NCB&language=vi&txt_billing_mobile=${res.data.telephone}&txt_billing_email=${res.data.email}&txt_billing_fullname=${res.data.nameRecipient}&txt_inv_addr1=${res.data.address}&txt_bill_city=ha%20noi&txt_bill_country=viet%20nam&txt_bill_state=ha%20noi&txt_inv_mobile=0389355471&txt_inv_email=quanganhsaker@gmail.com&txt_inv_customer=Nguy%E1%BB%85n%20Van%20A&txt_inv_addr1=ha%20noi&city&txt_inv_company=fsoft&txt_inv_taxcode=10&cbo_inv_type=other&vnp_OrderType=other&vnp_OrderInfo=${id}`;
    }

    getUrlImage = (image: string) => {
        const item = this.state.images.find(e => e.nameImg === image);
        return item ? item.url : ''
    }

    /**
     * 
     * @param id 
     * cancel order
     */
    handCancelOrder = (id: number) => {
        confirmAlert({
            title: '',
            message: 'Bạn có chắc chán muốn hủy đơn hàng?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let res = await axios.get(
                            `${process.env.REACT_APP_API_KEY}/order/cancel/${id}`, this.config
                        );
                        if (res.status === 200) {
                            toast.success("Hủy đơn hàng thành công", styleToast);
                            this.init()
                        } else {
                            toast.error("Hủy đơn hàng thất bại", styleToast);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                },
            ]
        });

    }

    /**
     * 
     * @param id 
     * Delivered order
     */

    handDeliveredOrder = (id: number) => {
        confirmAlert({
            title: '',
            message: 'Xác nhận đã giao hàng thành công!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let res = await axios.get(
                            `${process.env.REACT_APP_API_KEY}/order/delivered/${id}`, this.config
                        );
                        if (res.status === 200) {
                            toast.success("Xác nhận thành công", styleToast);
                            this.init()
                        } else {
                            toast.error("Xác nhận thất bại", styleToast);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                },
            ]
        });
    }
}