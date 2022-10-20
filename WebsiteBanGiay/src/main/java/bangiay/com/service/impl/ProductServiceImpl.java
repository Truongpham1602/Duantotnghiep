package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bangiay.com.dao.ProductDao;
import bangiay.com.service.ProductService;


import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	private ProductDao proDAO;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<Product> findAll(){
		List<Product> pro = proDAO.findAll();
		List<Product> result = pro.stream().map(d -> modelMapper.map(d,Product.class)).collect(Collectors.toList());
		return result;
	}
	
	@Override
	public Product finById(long id) {
		return proDAO.findById(id).get();
	}

	@Override
	public Product save(Product product) {
		return proDAO.save(product);
	}

	@Override
	public void delete(long id) {
		proDAO.deleteById(id);
	}
}
