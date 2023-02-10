package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.CategoryDTO;
import bangiay.com.DTO.ColorDTO;
import bangiay.com.DTO.OrderDTO;
import bangiay.com.DTO.OrderDetailDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.VoucherDTO;
import bangiay.com.service.OrderDetailService;
import bangiay.com.service.OrderService;
import bangiay.com.service.ProductService;
import bangiay.com.service.UserService;
import bangiay.com.service.VoucherService;
import bangiay.com.service.impl.CategoryServiceImpl;

@RestController
@RequestMapping("/nofilter")
public class NoFilterController {

	@Autowired
	UserService userService;
	@Autowired
	ProductService productService;
	@Autowired
	CategoryServiceImpl categoryService;
	@Autowired
	VoucherService voucherService;
	@Autowired
	OrderDetailService orderDetailService;

	@Autowired
	OrderService orderService;

	@GetMapping("/category/select")
	public Page<CategoryDTO> findAllCategory(@RequestParam(name = "size", defaultValue = "7") Integer size,
			@RequestParam(name = "page", defaultValue = "0") Integer page) {
		return categoryService.findAll(size, page);
	}

	@GetMapping("/product/select")
	public Page<ProductDTO> findAll(@RequestParam(name = "size", defaultValue = "7") Integer size,
			@RequestParam(name = "page", defaultValue = "0") Integer page) {
		return productService.findAll(size, page);
	}

	@GetMapping("/find/{id}")
	public ProductDTO finByID(@PathVariable("id") int id) {
		return productService.finById(id);
	}

	@PostMapping("/findByName")
	public ProductDTO findByName(@RequestBody ColorDTO colordto) {
		return this.productService.findByName(colordto);
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

	@GetMapping("/return/{id}")
	public OrderDTO updateReturnOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateReturnOrder(id);
	}

	@GetMapping("/findAll")
	public List<UserDTO> findAll() {
		return userService.findAll();
	}

	@PostMapping("/post")
	public UserDTO post(@RequestBody UserDTO userDTO) {
		return userService.create(userDTO);
	}

	@PostMapping("/searchClient")
	public Page<ProductDTO> searchClient(@RequestParam(name = "size", defaultValue = "11") Integer size,
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam(name = "cate_Id", defaultValue = "0") Integer cate_Id,
			@RequestParam(name = "keyword", defaultValue = "") String keyword) {
		return productService.searchByKeywordAndCate_Id(size, page, keyword, cate_Id);
	}

	@GetMapping("/product/findTop5New")
	public List<ProductDTO> findTop5New() {
		return this.productService.top5NewProduct();
	}

	@GetMapping("/product/findTop3Bill")
	public List<ProductDTO> findTop3Bill() {
		return this.productService.top3BillProduct();
	}

	@GetMapping("/findAll/voucher")
	public List<VoucherDTO> findAllVoucher() {
		return voucherService.findAll();
	}

	@GetMapping("/get/{id}")
	public VoucherDTO findById(@PathVariable Integer id) {
		return voucherService.findById(id);
	}

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

	@GetMapping("/findOrder/{id}")
	public OrderDTO finByID(@PathVariable("id") Integer id) {
		return this.orderService.findById(id);
	}

	@GetMapping("/findByOrder_Id/{order_Id}")
	public ResponseEntity<List<OrderDetailDTO>> findByOrder_Id(@PathVariable("order_Id") Integer order_Id) {
		return ResponseEntity.ok(this.orderDetailService.findByOrder_Id(order_Id));
	}
}
