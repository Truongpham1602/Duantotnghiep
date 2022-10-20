package bangiay.com.service;

import java.util.List;
<<<<<<< HEAD
import bangiay.com.DTO.ProductsDTO;

public interface ProductService {
	public List<ProductsDTO> findAll();
=======


import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;

public interface ProductService {
	public List<ProductDTO> findAll();
	
	public Product save(Product product);
	
	public Product finById(long id);
	
	public void delete(long id);
	
>>>>>>> marter
}
