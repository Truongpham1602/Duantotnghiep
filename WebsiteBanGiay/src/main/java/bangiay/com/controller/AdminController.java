package bangiay.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import bangiay.com.service.ProductService;

@Controller
public class AdminController {
	@Autowired
	private ProductService proService;
	
	@GetMapping("/admin")
	public String adminPage() {
		return "admin/index";
	}
	// Hiển thị all product
	@GetMapping("/admin/product/findAll")
	public String findAllPro(Model model) {
		model.addAttribute("lstPro", ResponseEntity.ok().body(proService.findAll()));
		return "admin/product/index";
	}
	
	// Hiển thị product theo id
	@GetMapping("/admin/product/findByID?{id}")
	public String findByIdPro(Model model, @PathVariable("id") Long id) {
		model.addAttribute(ResponseEntity.ok().body(proService.finById(id)));
		return "admin/product/index";
	}
}
