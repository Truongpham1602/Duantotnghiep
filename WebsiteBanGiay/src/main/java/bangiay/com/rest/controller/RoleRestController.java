package bangiay.com.rest.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.entity.Role;
import bangiay.com.service.impl.*;

@RestController
@RequestMapping("/role/")
public class RoleRestController {
	@Autowired
	RoleServiceImpl roleService;
	@PostMapping("/create")
	public Role create(@RequestBody Role role) {
		return roleService.create(role);
	}
	@GetMapping("/get/{id}")
	public Role get(@PathVariable Integer id) throws Exception{
		return roleService.findById(id);
	}
	@GetMapping("/get")
	public List<Role> getAll(){
		return roleService.findAll();
	}
	@PutMapping("/update/{id}")
	public Role update(@RequestBody Role role,@PathVariable Integer id) {
		return roleService.update(role, id);
	}
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Integer id) {
		roleService.delete(id);
	}
}
