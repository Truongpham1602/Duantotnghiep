package bangiay.com.dao;

import bangiay.com.DTO.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer>{
    @Query("SELECT p FROM Product p WHERE concat(p.category, ' ', p.color, ' ', p.name, ' ', p.description,"
                            + " ' ' ,p.code, ' ', p.price, ' ', p.quantity, ' ', p.created, ' ', p.creator,"
                            + " ' ', p.modified, ' ', p.modifier, ' ', p.status) LIKE %?1%")
    public List<Product> search(String keyword);
}
