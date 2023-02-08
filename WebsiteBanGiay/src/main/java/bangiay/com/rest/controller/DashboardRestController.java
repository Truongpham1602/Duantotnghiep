package bangiay.com.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.DashboardDTO;
import bangiay.com.service.DashboardService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/dashboard")
public class DashboardRestController {

	@Autowired
	DashboardService dashboardService;

	@PreAuthorize("hasPermission(#req, 'ADMIN')")
	@GetMapping
	public DashboardDTO getDashboard() {
		return dashboardService.getDashboard();
	}

}
