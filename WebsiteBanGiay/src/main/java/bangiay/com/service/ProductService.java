package bangiay.com.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.ProductsDTO;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Product;

@Service
public class ProductService {
	@Autowired
	private ProductDao proDAO;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<ProductsDTO> findAll(){
		List<Product> pro = proDAO.findAll();
		List<ProductsDTO> result = pro.stream().map(d -> modelMapper.map(d,ProductsDTO.class)).collect(Collectors.toList());
		return result;
	}
}
