package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Orders;

@Repository
public interface OrderDao extends JpaRepository <Orders, Integer>{
	@Query("SELECT o FROM Orders o WHERE o.user.id=?1 or o.telephone=?1")
	List<Orders> getOrderBySize_ID(Integer user_IdOrTelephone);

	//lấy danh sách order có trạng thái theo yêu cầu
//	@Query("select o from orders o where o.STATUS=?")
//	List<Orders> getOrderStatus(Integer status);
}
