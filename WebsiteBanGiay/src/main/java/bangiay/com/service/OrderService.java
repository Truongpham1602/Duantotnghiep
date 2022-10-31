package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.OrdersDTO;


public interface OrderService {
	
	public List<OrdersDTO> findAll();
	
	public List<OrdersDTO> findOrderBySize_ID(Integer size_Id);
	
	public OrdersDTO create(OrdersDTO ordersDTO);
	
	public OrdersDTO update(OrdersDTO ordersDTO);
	
	public OrdersDTO finById(int id);
	
	public void delete(int id);
}
