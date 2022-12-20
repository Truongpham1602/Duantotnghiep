package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import bangiay.com.DTO.CategoryDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;

public interface ProductService {

	public List<ProductDTO> findAll();

	Page<ProductDTO> findAll (Integer size , Integer page);

	public ProductDTO create(ProductDTO productDTO);

	public ProductDTO update(ProductDTO productDTO);

	public ProductDTO finById(Integer id);

	public void delete(Integer id);

	public List<Product> listAll(String keyword);

	public void updateStatusFalse(Integer id);
}
