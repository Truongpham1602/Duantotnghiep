package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductService {

	public List<ProductDTO> findAll();
	Page<ProductDTO> findAll(Pageable pageable);
	public ProductDTO create(ProductDTO productDTO);

	public ProductDTO update(ProductDTO productDTO);






	public ProductDTO finById(Integer id);

	public void delete(Integer id);

	List<ProductDTO> getAllProductByCategoryParent(Integer id);


	public List<Product> listAll(String keyword);

}
