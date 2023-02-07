package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.OrderCancelDTO;
import bangiay.com.DTO.OrderDTO;
import bangiay.com.doMain.constant;
import bangiay.com.entity.Order;
import bangiay.com.service.OrderService;

@RestController
@RequestMapping("api/order")
public class OrderRestController {

	@Autowired
	OrderService orderService;

	@GetMapping("/findAll")
	public List<OrderDTO> findAll() {
		return this.orderService.findAll();
	}

	@GetMapping("/select")
	public ResponseEntity<Page<OrderDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size) {
		Pageable pageable = PageRequest.of(page - 1, size);
		return ResponseEntity.ok(orderService.findAll(pageable));
	}

	@GetMapping("/search")
	public List<Order> findByStatus(@RequestParam Integer status) {
		return this.orderService.findByStatus(status);
	}
//	@DeleteMapping("/delete/{id}")
//		public void delete(@PathVariable("id") Integer id) {
//	}

	@PostMapping("/create")
	public OrderDTO create(@RequestParam(value = "user_Id", required = false, defaultValue = "0") Integer user_Id,
			@RequestParam(value = "voucher_Id", required = false, defaultValue = "0") Integer voucher_Id,
			@RequestBody OrderDTO orderDTO) {
		return this.orderService.create(orderDTO, user_Id, voucher_Id);
	}

	@GetMapping("/payment/{id}")
	public OrderDTO updatePaymentOrder(@PathVariable("id") Integer id) {
		return this.orderService.updatePaymentOrder(id);
	}

	@GetMapping("/cancel/{id}")
	public OrderDTO updateCancelOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateCancelOrder(id);
	}

	@GetMapping("/delivered/{id}")
	public OrderDTO updateDeliveredOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateDeliveredOrder(id);
	}

	@GetMapping("/find/{id}")
	public OrderDTO finByID(@PathVariable("id") Integer id) {
		return this.orderService.findById(id);
	}

	@GetMapping("/findOrderBySize_ID")
	public List<OrderDTO> findOrderBySize_ID(
			@RequestParam(value = "user_Id", required = false, defaultValue = "0") Integer user_Id,
			@RequestParam(value = "telephone", required = false, defaultValue = "0") String telephone) {
		return this.orderService.findByUser_IdOrTelephone(user_Id, telephone);
	}

	@GetMapping("/findOrderByUser_Id")
	public List<OrderDTO> findOrderByUser_ID(
			@RequestParam(value = "user_Id", required = false, defaultValue = "0") Integer user_Id) {
		return this.orderService.findByUser_Id(user_Id);
	}

	@GetMapping("/completed/{id}")
	public OrderDTO updateCompletedOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateCompletedOrder(id);
	}

	@PostMapping("updateStatus")
	public ResponseEntity<?> updateOrderWithStatus(@RequestParam("id") Integer id,
			@RequestParam("status") Integer status) {
		return new ResponseEntity<>(orderService.updateOrderWithStatus(id, status), HttpStatus.OK);
	}

	@PostMapping("/updateReturnStatus")
	public ResponseEntity<?> updateReturnStatus(@RequestBody OrderCancelDTO params) {
		return new ResponseEntity<>(orderService.updateReturnStatus(params), HttpStatus.OK);
	}

}
