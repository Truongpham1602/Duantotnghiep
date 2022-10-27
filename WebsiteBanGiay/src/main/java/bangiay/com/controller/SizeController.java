package bangiay.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.SizeDTO;
import bangiay.com.service.SizeService;

@RequestMapping(value = "/size")
@RestController
public class SizeController {
	@Autowired
	private SizeService sizeService;
	
	@GetMapping("/find-all")
	public ResponseEntity<List<SizeDTO>> getAllPro(){
		return ResponseEntity.ok().body(sizeService.findAll());
	}
	
	@GetMapping("/find-by-id/{id}")
	public ResponseEntity<?> findById(Model model,@PathVariable("id")Integer id){
		SizeDTO item = sizeService.findById(id);
		model.addAttribute("item", item);
		return ResponseEntity.ok(item);
	}
}
