package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;

import bangiay.com.DTO.ColorDTO;
import bangiay.com.DTO.ProductDTO;

public interface ProductService {

	public List<ProductDTO> findAll();

	Page<ProductDTO> findAll(Integer size, Integer page);

	public ProductDTO create(ProductDTO productDTO);

	public ProductDTO update(ProductDTO productDTO);

	public ProductDTO finById(Integer id);

	public void delete(Integer id);

	public Page<ProductDTO> searchByKeyword(Integer size, Integer page, String keyword);

	public void updateStatusFalse(ColorDTO colorDTO);

	public Page<ProductDTO> searchByKeywordAndCate_Id(Integer size, Integer page, String keyword, Integer cate_Id);

	public List<ProductDTO> top5NewProduct();

	public List<ProductDTO> top3BillProduct();

	public ProductDTO findByName(ColorDTO colorDTO);

	public ProductDTO findByColorAndName(ColorDTO colorDTO);
}
