package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer>{
	
}
