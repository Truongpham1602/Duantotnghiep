package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.OrdersDTO;

public interface OrderService {

	public List<OrdersDTO> findAll();

	public List<OrdersDTO> findOrderBySize_ID(Integer user_IdOrTelephone);

	public List<OrdersDTO> createHasUser(Integer user_Id, Integer voucher_Id);

	public OrdersDTO finById(int id);

	public void delete(int id);

	List<OrdersDTO> createNoUser(Integer voucher_Id);

	List<OrdersDTO> updateConfirm(Integer user_IdOrTelephone);

	List<OrdersDTO> updateDelivered(Integer user_IdOrTelephone);
}
