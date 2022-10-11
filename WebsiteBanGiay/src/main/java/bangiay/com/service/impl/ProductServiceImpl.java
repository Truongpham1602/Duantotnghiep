package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.ProductsDTO;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Products;
import bangiay.com.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao proDAO;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<ProductsDTO> findAll() {
		List<Products> pro = proDAO.findAll();
		List<ProductsDTO> result = pro.stream().map(d -> modelMapper.map(d,ProductsDTO.class)).collect(Collectors.toList());
		return result;
	}

}
