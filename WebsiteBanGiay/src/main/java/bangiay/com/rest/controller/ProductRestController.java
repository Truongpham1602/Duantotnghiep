package bangiay.com.rest.controller;


import java.util.List;

import bangiay.com.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.service.ProductService;

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
	public List<ProductDTO> getAllProductByParentId(@PathVariable Integer id) {
		return productService.getAllProductByCategoryParent(id);

	}
	@PostMapping("/search")
	public ResponseEntity<?> viewHomePage(Model model, @Param("keyword") String keyword) {
		List<Product> listProducts = productService.listAll(keyword);
		model.addAttribute("listProducts", listProducts);
		model.addAttribute("keyword", keyword);

		return ResponseEntity.ok(listProducts);
	}
}
