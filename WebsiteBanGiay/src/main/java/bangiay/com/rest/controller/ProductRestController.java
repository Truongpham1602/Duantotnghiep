package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.entity.Product;
import bangiay.com.service.ProductService;


@RestController
public class ProductRestController {
	@Autowired
	ProductService productService;
	
	@GetMapping("admin/product/index")
	public List<Product> getAll() {
		return productService.findAll();
	}
}
