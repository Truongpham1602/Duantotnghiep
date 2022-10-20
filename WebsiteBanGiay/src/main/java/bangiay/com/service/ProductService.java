package bangiay.com.service;

import java.util.List;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;

public interface ProductService {
	public List<Product> findAll();
	
	public Product save(Product product);
	
	public Product finById(long id);
	
	public void delete(long id);
	
}
