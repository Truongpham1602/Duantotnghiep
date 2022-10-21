package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.service.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import bangiay.com.DTO.ProductDTO;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	ProductService productService;

	@GetMapping("/index")
	public List<ProductDTO> findAll() {
		return productService.findAll();
	}
	
	@DeleteMapping("/delete?{id}")
	public void delete(@PathVariable("id") Long id) {
		productService.delete(id);
	}
	
	@PostMapping("/post")
	public ProductDTO post(@RequestBody ProductDTO productDTO) {
		return productService.save(productDTO);
	}
	
	@PutMapping("/put?{id}")
	public ProductDTO put(@RequestBody @PathVariable("id") Long id, ProductDTO productDTO) {
		return productService.save(productDTO);
	}
}
