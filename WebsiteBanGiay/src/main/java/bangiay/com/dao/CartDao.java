package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Cart;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {
	@Query("SELECT c FROM Cart c WHERE c.user.id =?1")
	List<Cart> findByUser_Id(Integer user_Id);
}
