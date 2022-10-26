package bangiay.com.service;

import java.util.List;
import bangiay.com.DTO.ProductDTO;

public interface ProductService {
	public List<ProductDTO> findAll();
	
	public ProductDTO create(ProductDTO productDTO);
	
	public ProductDTO update(ProductDTO productDTO);
	
	public ProductDTO finById(int id);
	
	public void delete(int id);
}
