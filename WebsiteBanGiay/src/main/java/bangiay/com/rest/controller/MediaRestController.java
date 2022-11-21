package bangiay.com.rest.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.MediaDTO;
import bangiay.com.service.impl.MediaServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/media")
public class MediaRestController {
	@Autowired
	private MediaServiceImpl mediaServiceImpl;

	@GetMapping("/findAll")
	public List<MediaDTO> findAll() {
		return mediaServiceImpl.findAll();
	}

	@PostMapping("/create")
	public List<MediaDTO> create(@RequestBody List<MediaDTO> mediaDTO) {
		System.out.println(mediaDTO);
		return mediaServiceImpl.createAll(mediaDTO);
	}

	@PutMapping("/update")
	public MediaDTO update(@RequestBody MediaDTO mediaDTO) {
		return mediaServiceImpl.update(mediaDTO);
	}

	@DeleteMapping("/update")
	public void update(Integer id) {
		mediaServiceImpl.delete(id);
	}

}
