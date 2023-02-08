package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.CategoryDTO;
import bangiay.com.DTO.ColorDTO;
import bangiay.com.DTO.OrderDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.VoucherDTO;
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
	public ProductDTO finByID(@RequestBody @PathVariable("id") int id, ProductDTO productDTO) {
		return productService.finById(id);
	}
	@PostMapping("/findByName")
	public ProductDTO findByName(@RequestBody ColorDTO colordto) {
		return this.productService.findByName(colordto);
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
}
