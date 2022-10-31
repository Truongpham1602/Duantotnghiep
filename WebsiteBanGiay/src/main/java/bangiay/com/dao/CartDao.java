package bangiay.com.dao;

import bangiay.com.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {

}
