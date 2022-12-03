package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import bangiay.com.DTO.UserDTO;
import bangiay.com.doMain.constant;
import bangiay.com.doMain.exception.AppException;
import bangiay.com.entity.*;
import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.CartDTO;
import bangiay.com.DTO.OrdersDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.OrderDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.VoucherDao;
import bangiay.com.service.CartService;
import bangiay.com.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CartDao cartDao;

	@Autowired
	private SizeDao sizeDao;

	@Autowired
	private VoucherDao voucherDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CartService cartService;

	@Override
	public Page<OrdersDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(orderDao.findAll(pageable), OrdersDTO.class);
	}

	@Override
	public List<OrdersDTO> createHasUser(Integer user_Id, Integer voucher_Id) {
		List<Cart> lstCart = this.cartDao.findByUser_Id(user_Id);
		Voucher voucher = this.voucherDao.findById(voucher_Id).orElse(null);
		List<OrdersDTO> lstOrderDTO = new ArrayList<OrdersDTO>();
		for (int i = 0; i < lstCart.size(); i++) {
			if (voucher != null) {
				if (voucher.getType() == 1) {
					if (voucher.getCategory().getId() == lstCart.get(i).getSize().getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCart.get(i).getSize().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSize().getProduct().getPrice()
										- (lstCart.get(i).getSize().getProduct().getPrice() * voucher.getValue() / 100),
								null, null, null, null, null, null, null, null, null, 1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCart.get(i).getSize().getId(),
								user_Id, lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(),
								null, null, null, null, null, null, null, null, null, 1));
					}
				} else {
					if (voucher.getCategory().getId() == lstCart.get(i).getSize().getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCart.get(i).getSize().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSize().getProduct().getPrice() - voucher.getValue(), null, null, null,
								null, null, null, null, null, null, 1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCart.get(i).getSize().getId(),
								user_Id, lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(),
								null, null, null, null, null, null, null, null, null, 1));
					}
				}

			} else {
				lstOrderDTO.add(new OrdersDTO(null, null, "code", lstCart.get(i).getSize().getId(), user_Id,
						lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(), null, null,
						null, null, null, null, null, null, null, 1));
			}
		}
		List<Orders> lstOrder = lstOrderDTO.stream().map(d -> modelMapper.map(d, Orders.class))
				.collect(Collectors.toList());
		this.orderDao.saveAll(lstOrder);
		return lstOrderDTO;
	}

	@Override
	public List<OrdersDTO> updateConfirm(Integer user_IdOrTelephone) {
		List<Orders> lstOrder = this.orderDao.getOrderBySize_ID(user_IdOrTelephone);
		for (Orders o : lstOrder) {
			o.setStatus(2);
		}
		List<OrdersDTO> lstOrderDTO = lstOrder.stream().map(d -> modelMapper.map(d, OrdersDTO.class))
				.collect(Collectors.toList());
		this.orderDao.saveAll(lstOrder);
		return lstOrderDTO;
	}

	@Override
	public List<OrdersDTO> updateDelivered(Integer user_IdOrTelephone) {
		List<Orders> lstOrder = this.orderDao.getOrderBySize_ID(user_IdOrTelephone);
		for (Orders o : lstOrder) {
			o.setStatus(3);
		}
		List<OrdersDTO> lstOrderDTO = lstOrder.stream().map(d -> modelMapper.map(d, OrdersDTO.class))
				.collect(Collectors.toList());
		this.orderDao.saveAll(lstOrder);
		return lstOrderDTO;
	}



	@Override
	public Orders updateOrderWithStatus(Integer id,Integer status) {
		Orders orders = orderDao.getById(id);
//		if (orders == null) {
//
//			throw new AppException(constant.ORDER_STATUS_MSG_ERROR_NOT_EXIST);
//		}
//		if (orders.getStatus().equals(constant.ORDER_STATUS_CANCEL) || orders.getStatus().equals(constant.ORDER_STATUS_SUCCESS)) {
//
//			throw new AppException(constant.ORDER_STATUS_MSG_ERROR_NOT_EXIST);
//		}
//		if (orders.getStatus().equals(status)) {
//			throw new AppException(constant.ORDER_MSG_ERROR_ALREADY_STATUS);
//		}
//		if (orders.getStatus() > id) {
//			throw new AppException(constant.ORDER_STATUS_MSG_ERROR_NOT_EXIST);
//		}
//		if (status == constant.ORDER_STATUS_SUCCESS) {
//			orders.setStatus(3);
//		}

		orders.setStatus(status);
		System.out.println(status);
		orders.setModified(Timestamp.from(Instant.now()));
		return orderDao.save(orders);

	}
//	@Override
//	public List<OrdersDTO> getOrderStatus(Integer status) {
//		List<Orders> orders= this.orderDao.getOrderStatus(status);
//		Orders orders1 = modelMapper.map(orders, Orders.class);
//		if (status == 0){
//			System.out.println("Chưa thanh toán");
//			orders1.setStatus(orders1.getStatus());
//		} else if (status ==1) {
//			System.out.println("Đã thanh toán");
//		}else {
//			System.out.println("đã giao");
//		}
//		return orders1;
//	}

	@Override
	public OrdersDTO finById(int id) {
		return null;
	}

	@Override
	public void delete(int id) {

	}

	@Override
	public List<OrdersDTO> findOrderBySize_ID(Integer user_IdOrTelephone) {
		List<Orders> order = this.orderDao.getOrderBySize_ID(user_IdOrTelephone);
		List<OrdersDTO> orderDTO = order.stream().map(d -> modelMapper.map(d, OrdersDTO.class))
				.collect(Collectors.toList());
		return orderDTO;
	}

	@Override
	public List<OrdersDTO> createNoUser(OrdersDTO ordersDTO, Integer voucher_Id) {
		List<CartDTO> lstCartDTO = this.cartService.getCartNoUser();
		List<OrdersDTO> lstOrderDTO = new ArrayList<OrdersDTO>();
		Voucher voucher = this.voucherDao.findById(voucher_Id).orElse(null);
		for (int i = 0; i < lstCartDTO.size(); i++) {
			Size size = this.sizeDao.findById(lstCartDTO.get(i).getSize_Id()).get();
			if (voucher != null) {
				if (voucher.getType() == 1) {
					if (voucher.getCategory().getId() == size.getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCartDTO.get(i).getSize_Id(),
								null, lstCartDTO.get(i).getQuantity(),
								size.getProduct().getPrice()
										- (size.getProduct().getPrice() * voucher.getValue() / 100),
								ordersDTO.getNameRecipient(), ordersDTO.getTelephone(), ordersDTO.getAddress(), null,
								null, null, null, null, null, 1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCartDTO.get(i).getSize_Id(),
								null, lstCartDTO.get(i).getQuantity(), size.getProduct().getPrice(),
								ordersDTO.getNameRecipient(), ordersDTO.getTelephone(), ordersDTO.getAddress(), null,
								null, null, null, null, null, 1));
					}
				} else {

					if (voucher.getCategory().getId() == size.getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCartDTO.get(i).getSize_Id(),
								null, lstCartDTO.get(i).getQuantity(),
								size.getProduct().getPrice() - voucher.getValue(), ordersDTO.getNameRecipient(),
								ordersDTO.getTelephone(), ordersDTO.getAddress(), null, null, null, null, null, null,
								1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher.getId(), "code", lstCartDTO.get(i).getSize_Id(),
								null, lstCartDTO.get(i).getQuantity(), size.getProduct().getPrice(),
								ordersDTO.getNameRecipient(), ordersDTO.getTelephone(), ordersDTO.getAddress(), null,
								null, null, null, null, null, 1));
					}
				}
			} else {
				lstOrderDTO.add(new OrdersDTO(null, null, "code", lstCartDTO.get(i).getSize_Id(), null,
						lstCartDTO.get(i).getQuantity(), size.getProduct().getPrice(), ordersDTO.getNameRecipient(),
						ordersDTO.getTelephone(), ordersDTO.getAddress(), null, null, null, null, null, null, 1));
			}
		}
		List<Orders> lstOrder = lstOrderDTO.stream().map(d -> modelMapper.map(d, Orders.class))
				.collect(Collectors.toList());
		this.orderDao.saveAll(lstOrder);
		return lstOrderDTO;
	}

}
