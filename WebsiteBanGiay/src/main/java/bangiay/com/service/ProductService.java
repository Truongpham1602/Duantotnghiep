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


	public List<Product> listAll(String keyword);



	public ProductDTO finById(Integer id);

	public void delete(Integer id);

	List<ProductDTO> getAllProductByCategoryParent(Integer id);

}
