package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;
import bangiay.com.service.ProductService;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	private ProductService proServi;
	
	@GetMapping
	public List<ProductDTO> getAll(){
		return proServi.findAll();
	}
	
	@GetMapping("{id}")
	public Product getOne(@PathVariable("id")Long id) {
		return proServi.finById(id);
	}
	
	@PostMapping
	public Product post(@RequestBody Product product) {
		proServi.save(product);
		return product;
	}
	
	@PutMapping("{id}")
	public Product put(@PathVariable("id") Long id, @RequestBody Product product) {
		proServi.save(product);
		return product;
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Long id) {
		proServi.delete(id);
	}
}
