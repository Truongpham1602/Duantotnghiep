package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.dao.CategoryDao;
import bangiay.com.dao.ProductDao;
import bangiay.com.service.ProductService;


import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	private ProductDao proDAO;
	@Autowired
	private CategoryDao cateDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<ProductDTO> findAll(){
		List<Product> pro = proDAO.findAll();
		List<ProductDTO> result = pro.stream().map(d -> modelMapper.map(d,ProductDTO.class)).collect(Collectors.toList());
		for (int i=0; i<pro.size();i++) {
			result.get(i).setName_cate(pro.get(i).getCategory().getNamecate());
		}
		return result;
	}
	
	@Override
	public ProductDTO finById(int id) {
		Product product = proDAO.findById(id).get();
		ProductDTO productdto = modelMapper.map(product, ProductDTO.class);
		return productdto;
	}

	@Override
	public ProductDTO create(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		product.setCategory(this.cateDao.findById(1).get());
		product.setCreated(Timestamp.from(Instant.now()));
		this.proDAO.save(product);
		return productDTO;
	}
	
	@Override
	public ProductDTO update(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		product.setCategory(this.cateDao.findById(1).get());
		product.setCreated(product.getCreated());
		product.setModified(Timestamp.from(Instant.now()));
		this.proDAO.save(product);
		return productDTO;
	}


	@Override
	public void delete(int id) {
		proDAO.deleteById(id);
	}
}
