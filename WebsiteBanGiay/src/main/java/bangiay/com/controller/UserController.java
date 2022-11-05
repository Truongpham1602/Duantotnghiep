package bangiay.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.service.UserService;

@RequestMapping(value = "/user")
@RestController
public class UserController {
	@Autowired
	private UserService userService;

//		@GetMapping(value = "/findAll")
//		public ResponseEntity<List<UserDTO>> getAll(){
//			return ResponseEntity.ok().body(userService.findAll());
//		}
//		
//		@PostMapping(value = "/create")
//		public ResponseEntity<UserDTO> create(@RequestBody UserDTO user){
//			return ResponseEntity.ok().body(userService.save(user));
//		}
//		
//		@PostMapping(value = "/update")
//	    public ResponseEntity<UserDTO> update(@RequestParam(name = "id") Integer id,@RequestBody  UserDTO user) {
//			user.setId(id);
//	        return ResponseEntity.ok().body(userService.save(user));
//	    }
//		 @PostMapping(value = "/delete")
//		    public ResponseEntity<String> delete(@RequestParam(name = "id") Integer id) {
//			 userService.delete(id);
//		        return ResponseEntity.ok().body("Delete cart id " + id + " successfully!");
//		    }
}
