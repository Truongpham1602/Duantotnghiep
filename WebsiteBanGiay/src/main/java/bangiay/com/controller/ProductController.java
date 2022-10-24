package bangiay.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Product;
import bangiay.com.service.ProductService;

@RequestMapping(value = "/product")
@RestController
public class ProductController {
	@Autowired
	private ProductService proService;
	
	// Hiển thị all product
	@GetMapping("/admin/product/findAll")
	public ResponseEntity<List<ProductDTO>> getAll(){
		return ResponseEntity.ok().body(proService.findAll());
	}
	
	// Hiển thị product theo id
	@GetMapping("/admin/product/findByID")
	public ResponseEntity<ProductDTO> getByID(@PathVariable("id") Long id){
		return ResponseEntity.ok().body(proService.finById(id));
	}
}
