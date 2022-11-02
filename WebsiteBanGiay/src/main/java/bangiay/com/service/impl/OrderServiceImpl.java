package bangiay.com.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.OrdersDTO;
import bangiay.com.DTO.request.CartDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.OrderDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.VoucherDao;
import bangiay.com.entity.Cart;
import bangiay.com.entity.Orders;
import bangiay.com.entity.Size;
import bangiay.com.entity.Voucher;
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
	private CartDTO cartDTO;

	@Override
	public List<OrdersDTO> findAll() {
		List<Orders> order = this.orderDao.findAll();
		List<OrdersDTO> orderDTO = order.stream().map(d -> modelMapper.map(d, OrdersDTO.class))
				.collect(Collectors.toList());
		return orderDTO;
	}

	@Override
	public List<OrdersDTO> createHasUser(Integer user_Id, Integer voucher_Id) {
		List<Cart> lstCart = this.cartDao.getCartByUser_Id(user_Id);
		Voucher voucher = this.voucherDao.findById(voucher_Id).get();
		List<OrdersDTO> lstOrderDTO = new ArrayList<OrdersDTO>();
		for (int i = 0; i < lstCart.size(); i++) {
			if (voucher != null) {
				if (voucher.getType() == 1) {
					if (voucher.getCategory().getId() == lstCart.get(i).getSIZE_ID().getProduct().getCategory()
							.getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCart.get(i).getSIZE_ID().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSIZE_ID().getProduct().getPrice()
										- (lstCart.get(i).getSIZE_ID().getProduct().getPrice() * voucher.getValue()
												/ 100),
								null, null, null, null, null, null, null, null, null, 1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCart.get(i).getSIZE_ID().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSIZE_ID().getProduct().getPrice(), null, null, null, null, null, null,
								null, null, null, 1));
					}
				} else {
					if (voucher.getCategory().getId() == lstCart.get(i).getSIZE_ID().getProduct().getCategory()
							.getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCart.get(i).getSIZE_ID().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSIZE_ID().getProduct().getPrice() - voucher.getValue(), null, null,
								null, null, null, null, null, null, null, 1));
					} else {

						lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCart.get(i).getSIZE_ID().getId(),
								user_Id, lstCart.get(i).getQuantity(),
								lstCart.get(i).getSIZE_ID().getProduct().getPrice(), null, null, null, null, null, null,
								null, null, null, 1));
					}
				}

			} else {
				lstOrderDTO.add(new OrdersDTO(null, null, "code", lstCart.get(i).getSIZE_ID().getId(), user_Id,
						lstCart.get(i).getQuantity(), lstCart.get(i).getSIZE_ID().getProduct().getPrice(), null, null,
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
	public List<OrdersDTO> createNoUser(Integer voucher_Id) {
		List<CartDTO> lstCartDTO = this.cartDTO.getLstCartNoUser();
		List<OrdersDTO> lstOrderDTO = new ArrayList<OrdersDTO>();
		Voucher voucher = this.voucherDao.findById(voucher_Id).get();
		for (int i = 0; i < lstCartDTO.size(); i++) {
			if (voucher != null) {
				Size size = this.sizeDao.findById(lstCartDTO.get(i).getSize_id()).get();
				if (voucher.getType() == 1) {
					if (voucher.getCategory().getId() == size.getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCartDTO.get(i).getSize_id(), null,
								lstCartDTO.get(i).getQuantity(),
								lstCartDTO.get(i).getPrice()
										- (lstCartDTO.get(i).getPrice() * voucher.getValue() / 100),
								null, null, null, null, null, null, null, null, null, 1));
					}
					lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCartDTO.get(i).getSize_id(), null,
							lstCartDTO.get(i).getQuantity(), lstCartDTO.get(i).getPrice(), null, null, null, null, null,
							null, null, null, null, 1));
				}
				if (voucher.getCategory().getId() == size.getProduct().getCategory().getId()) {
					lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCartDTO.get(i).getSize_id(), null,
							lstCartDTO.get(i).getQuantity(), lstCartDTO.get(i).getPrice() - voucher.getValue(), null,
							null, null, null, null, null, null, null, null, 1));
				}
				lstOrderDTO.add(new OrdersDTO(null, voucher_Id, "code", lstCartDTO.get(i).getSize_id(), null,
						lstCartDTO.get(i).getQuantity(), lstCartDTO.get(i).getPrice(), null, null, null, null, null,
						null, null, null, null, 1));
			} else {
				lstOrderDTO.add(new OrdersDTO(null, null, "code", lstCartDTO.get(i).getSize_id(), null,
						lstCartDTO.get(i).getQuantity(), lstCartDTO.get(i).getPrice(), null, null, null, null, null,
						null, null, null, null, 1));
			}
		}
		List<Orders> lstOrder = lstOrderDTO.stream().map(d -> modelMapper.map(d, Orders.class))
				.collect(Collectors.toList());
		this.orderDao.saveAll(lstOrder);
		return lstOrderDTO;
	}

}
