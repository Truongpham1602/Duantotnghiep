package bangiay.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.service.ProductService;

@RequestMapping(value = "/product")
@RestController
public class ProductController {
	@Autowired
	private ProductService proService;
	
	@GetMapping("/find-all")
	public ResponseEntity<List<ProductDTO>> getAllPro(){
		return ResponseEntity.ok().body(proService.findAll());
	}
	
	
}
