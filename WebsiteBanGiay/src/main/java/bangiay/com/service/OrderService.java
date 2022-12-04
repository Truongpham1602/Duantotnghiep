package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.OrderDTO;

public interface OrderService {

	public List<OrderDTO> findAll();

	public OrderDTO create(OrderDTO orderDTO, Integer user_Id, Integer voucher_Id);

	// Cập nhật thanh toán đơn hàng thành công
	public OrderDTO updatePaymentOrder(Integer id);

	// Cập nhật đơn hàng bị hủy
	public OrderDTO updateCancelOrder(Integer id);

	// Cập nhật đơn hàng đã giao
	public OrderDTO updateDeliveredOrder(Integer id);

	public OrderDTO findById(Integer id);

	// Tìm danh sách đơn hàng theo user_Id hoặc SĐT
	public List<OrderDTO> findByUser_IdOrTelephone(String user_idOrTelephone);

}
