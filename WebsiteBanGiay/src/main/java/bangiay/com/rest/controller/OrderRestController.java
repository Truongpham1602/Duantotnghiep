package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.OrdersDTO;
import bangiay.com.service.OrderService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("order")
public class OrderRestController {

	@Autowired
	OrderService orderService;

	@GetMapping("/findAll")
	public List<OrdersDTO> findAll() {
		return this.orderService.findAll();
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") Integer id) {
	}

	@PostMapping("/createHasUser/{user_Id}")
	public List<OrdersDTO> createHasUser(@PathVariable("user_Id") Integer user_Id,
			@RequestParam(value = "voucher_Id", required = false, defaultValue = "0") Integer voucher_Id) {
		return this.orderService.createHasUser(user_Id, voucher_Id);
	}

	@PutMapping("/confirm/{user_IdOrTelephone}")
	public List<OrdersDTO> updateConfirm(@PathVariable("user_IdOrTelephone") Integer user_IdOrTelephone) {
		return this.orderService.updateConfirm(user_IdOrTelephone);
	}

	@PutMapping("/delivered/{user_IdOrTelephone}")
	public List<OrdersDTO> updateDelivered(@PathVariable("user_IdOrTelephone") Integer user_IdOrTelephone) {
		return this.orderService.updateConfirm(user_IdOrTelephone);
	}

	@GetMapping("/find/{id}")
	public OrdersDTO finByID(@PathVariable("id") Integer id) {
		return this.orderService.finById(id);
	}

	@GetMapping("/findOrderBySize_ID/{user_IdOrTelephone}")
	public List<OrdersDTO> findOrderBySize_ID(@PathVariable("user_IdOrTelephone") Integer user_IdOrTelephone) {
		return this.orderService.findOrderBySize_ID(user_IdOrTelephone);
	}

	@PostMapping("/createNoUser")
	public List<OrdersDTO> createHasUser(@RequestBody OrdersDTO ordersDTO,
			@RequestParam(value = "voucher_Id", required = false, defaultValue = "0") Integer voucher_Id) {
		System.out.println("Rest --->  " + ordersDTO);
		return this.orderService.createNoUser(ordersDTO, voucher_Id);
	}

}
