package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.dao.CategoryDao;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Product;
import bangiay.com.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDao proDAO;
	@Autowired
	private CategoryDao cateDao;

	@Autowired
	private ModelMapper modelMapper;

	public List<ProductDTO> findAll() {
		List<Product> pro = proDAO.findAll();
		List<ProductDTO> result = pro.stream().map(d -> modelMapper.map(d, ProductDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < pro.size(); i++) {
			result.get(i).setName_cate(pro.get(i).getCategory().getNamecate());
		}
		return result;
	}

	@Override
	public ProductDTO finById(Integer id) {
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
		productDTO.setId(product.getId());
		productDTO.setName_cate(product.getCategory().getNamecate());
		productDTO.setCreated(new Timestamp(product.getCreated().getTime()));
		return productDTO;
	}

	@Override
	public ProductDTO update(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		Product p = proDAO.findById(productDTO.getId()).get();
		product.setCategory(this.cateDao.findById(productDTO.getCategoryId()).get());
		product.setCreated(p.getCreated());
		product.setModified(Timestamp.from(Instant.now()));
		this.proDAO.save(product);
		productDTO.setId(product.getId());
		productDTO.setModified(new Timestamp(product.getModified().getTime()));
		productDTO.setCreated(new Timestamp(p.getCreated().getTime()));
		productDTO.setName_cate(product.getCategory().getNamecate());
		return productDTO;
	}

	@Override
	public void delete(Integer id) {
		proDAO.deleteById(id);
	}

	@Override
	public List<ProductDTO> getAllProductByCategoryParent(Integer id) {
		return proDAO.getProductByCategoryParent(id).stream().map(pro -> modelMapper.map(pro, ProductDTO.class))
				.collect(Collectors.toList());
	}
}
