package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.SizeDTO;
import bangiay.com.service.SizeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/size")
public class SizeRestController {
	@Autowired
	SizeService SizeService;

	@GetMapping("/index")
	public List<SizeDTO> findAll() {
		return SizeService.findAll();
	}

	@GetMapping("/find/{id}")
	public SizeDTO findAll(@PathVariable("id") Integer id) {
		return SizeService.findById(id);
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") Integer id) {
		SizeService.delete(id);
	}

	@PostMapping("/postList")
	public List<SizeDTO> postList(@RequestBody List<SizeDTO> SizeDTO) {
		return SizeService.saveList(SizeDTO);
	}

	@PostMapping("/post")
	public SizeDTO post(@RequestBody SizeDTO SizeDTO) {
		return SizeService.save(SizeDTO);
	}

	@PutMapping("/put/{id}")
	public SizeDTO put(@RequestBody SizeDTO SizeDTO, @PathVariable("id") Integer id) {
		SizeDTO.setId(id);
		return SizeService.save(SizeDTO);
	}
}
