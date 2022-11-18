package bangiay.com.service;

import java.util.List;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;

public interface ProductService {

	public List<ProductDTO> findAll();
	
	public ProductDTO create(ProductDTO productDTO);
	
	public ProductDTO update(ProductDTO productDTO);
	
	public ProductDTO finById(int id);
	
	public void delete(int id);

	public List<Product> listAll(String keyword);

}
