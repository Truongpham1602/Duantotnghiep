package bangiay.com.dao;

import bangiay.com.entity.Cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {
	@Query("SELECT o FROM Cart o WHERE o.USER_ID.id=?1")
	List<Cart> getCartByUser_Id(Integer user_Id);
}
