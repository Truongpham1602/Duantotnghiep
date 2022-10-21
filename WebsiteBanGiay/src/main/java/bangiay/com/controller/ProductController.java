package bangiay.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public ResponseEntity<List<ProductDTO>> getAllPro(Model model){
		List<ProductDTO> pro = proService.findAll();
		model.addAttribute("items" , pro);
		return ResponseEntity.ok(pro);
	}
	
	@GetMapping("/find-by-id/{id}")
	public ResponseEntity<?> findById(Model model,@PathVariable("id")Long id){
		ProductDTO item = proService.finById(id);
		model.addAttribute("item", item);
		return ResponseEntity.ok(item);
	}
}
