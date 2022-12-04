package bangiay.com.rest.controller;

import java.util.List;

import bangiay.com.doMain.constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bangiay.com.DTO.UserDTO;
import bangiay.com.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/user")
public class UserRestController {
	@Autowired
	UserService userService;

	@GetMapping("/index")
	public List<UserDTO> findAll() {
		return userService.findAll();
	}
	@GetMapping("/select")
	public ResponseEntity<Page<UserDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size
	) {
		Pageable pageable = PageRequest.of(page - 1 , size);
//        Page<User> userPage = userService.findAll(status,username,pageable);
//        Page<UserDTO> userDTOS = ObjectMapperUtils.mapEntityPageIntoDtoPage(userPage, UserDTO.class);
//        return ResponseEntity.ok().body(userDTOS);
//        return ResponseEntity.ok(userService.findAll(status,username,PageRequest.of(page - 1, size, userSorter.getSort())));
		return ResponseEntity.ok(userService.findAll(pageable));
	}
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") int id) {
		userService.delete(id);
	}
	
	@PostMapping("/post")
	public UserDTO post(@RequestBody UserDTO userDTO) {
		return userService.create(userDTO);
	}
	
	@PutMapping("/put/{id}")
	public UserDTO put(@PathVariable("id") Integer id, @RequestBody UserDTO userDTO) {
		userDTO.setId(id);
		return userService.update(userDTO);
	}
	
	@GetMapping("/find/{id}")
	public UserDTO finByID(@RequestBody @PathVariable("id") int id, UserDTO userDTO) {
		return userService.finById(id);
	}

}
