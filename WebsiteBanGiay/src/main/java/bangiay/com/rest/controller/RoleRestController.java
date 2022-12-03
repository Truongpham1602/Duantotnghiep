package bangiay.com.rest.controller;

import java.util.List;

import bangiay.com.DTO.RoleDTO;
import bangiay.com.DTO.SizeDTO;
import bangiay.com.doMain.constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bangiay.com.entity.Role;
import bangiay.com.service.impl.RoleServiceImpl;

@RestController
@RequestMapping("/role")
public class RoleRestController {
	@Autowired
	RoleServiceImpl roleService;


	@PostMapping("/create")
	public Role create(@RequestBody Role role) {
		return roleService.create(role);
	}

	@PostMapping("/createAll")
	public List<Role> createAll(@RequestBody List<Role> role) {
		return roleService.createAll(role);
	}

	@GetMapping("/get/{id}")
	public Role get(@PathVariable Integer id) throws Exception {
		return roleService.findById(id);
	}

	@GetMapping("/index")
	public ResponseEntity<Page<RoleDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size
	) {
		Pageable pageable = PageRequest.of(page - 1 , size);
//        Page<User> userPage = userService.findAll(status,username,pageable);
//        Page<UserDTO> userDTOS = ObjectMapperUtils.mapEntityPageIntoDtoPage(userPage, UserDTO.class);
//        return ResponseEntity.ok().body(userDTOS);
//        return ResponseEntity.ok(userService.findAll(status,username,PageRequest.of(page - 1, size, userSorter.getSort())));
		return ResponseEntity.ok(roleService.findAll(pageable));
	}

	@PutMapping("/update/{id}")
	public Role update(@RequestBody Role role, @PathVariable Integer id) {
		return roleService.update(role, id);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Integer id) {
		roleService.delete(id);
	}

}
