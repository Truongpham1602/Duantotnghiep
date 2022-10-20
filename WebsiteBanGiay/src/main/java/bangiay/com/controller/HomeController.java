package bangiay.com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping({"/home","home/index"}) 
	public String index() { 
		return "layout/index"; 
	}
	
	@RequestMapping({"/admin"})
	public String admin() {
		return "redirect:/assets/admin/index.html";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/register")
	public String register() {
		return "register";
	}
}
