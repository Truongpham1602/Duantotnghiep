package bangiay.com.rest.controller;


import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;
import bangiay.com.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("admin/product")
public class ProductRestController {

	@Autowired
	ProductService productService;
	
	@GetMapping("/index")
	public List<ProductDTO> findAll() {
		return productService.findAll();
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") int id) {
		productService.delete(id);
	}
	
	@PostMapping("/post")
	public ProductDTO post(@RequestBody ProductDTO productDTO) {
		return productService.create(productDTO);
	}
	
	@PutMapping("/put/{id}")
	public ProductDTO put(@PathVariable("id") Integer id, @RequestBody ProductDTO productDTO) {
		productDTO.setId(id);
		return productService.update(productDTO);
	}
	
	@GetMapping("/find/{id}")
	public ProductDTO finByID(@RequestBody @PathVariable("id") int id, ProductDTO productDTO) {
		return productService.finById(id);
	}
	@GetMapping("/find-by-category-parent/{id}")
	public List<Product> getAllProductByParentId(@PathVariable Integer id){
		return productService.getAllProductByCategoryParent(id);
	}
}
