package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Long>{
//	@Query("SELECT p FROM Product p WHERE p.Category.id=?1")
//	List<Product> findByCategoryId(String cid);
}
