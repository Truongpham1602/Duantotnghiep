package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.OrdersDTO;
import bangiay.com.dao.OrderDao;
import bangiay.com.entity.Orders;
import bangiay.com.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<OrdersDTO> findAll() {
		List<Orders> order = this.orderDao.findAll();
		List<OrdersDTO> orderDTO = order.stream().map(
			d -> modelMapper.map(d,OrdersDTO.class)).collect(Collectors.toList()
		);
		return orderDTO;
	}

	@Override
	public OrdersDTO create(OrdersDTO ordersDTO) {
		return null;
	}

	@Override
	public OrdersDTO update(OrdersDTO ordersDTO) {
		return null;
	}

	@Override
	public OrdersDTO finById(int id) {
		return null;
	}

	@Override
	public void delete(int id) {
		
	}

	@Override
	public List<OrdersDTO> findOrderBySize_ID(Integer size_Id) {
		List<Orders> order = this.orderDao.getOrderBySize_ID(size_Id);
		List<OrdersDTO> orderDTO = order.stream().map(
			d -> modelMapper.map(d,OrdersDTO.class)).collect(Collectors.toList()
		);
		return orderDTO;
	}
	
}
