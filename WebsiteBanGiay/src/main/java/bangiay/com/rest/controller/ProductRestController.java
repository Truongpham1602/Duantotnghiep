package bangiay.com.rest.controller;


import java.util.List;

import bangiay.com.doMain.constant;
import bangiay.com.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.service.ProductService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("admin/product")
public class ProductRestController {

	@Autowired
	ProductService productService;

	@GetMapping("/index")
	public ResponseEntity<Page<ProductDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size
	) {
		Pageable pageable = PageRequest.of(page - 1 , size);
//        Page<User> userPage = userService.findAll(status,username,pageable);
//        Page<UserDTO> userDTOS = ObjectMapperUtils.mapEntityPageIntoDtoPage(userPage, UserDTO.class);
//        return ResponseEntity.ok().body(userDTOS);
//        return ResponseEntity.ok(userService.findAll(status,username,PageRequest.of(page - 1, size, userSorter.getSort())));
		return ResponseEntity.ok(productService.findAll(pageable));
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") int id) {
		productService.delete(id);
	}

	@PostMapping("/post")
	public ProductDTO post(@RequestBody ProductDTO productDTO) {
		return productService.create(productDTO);
	}

	@PutMapping("/put/{id}")
	public ProductDTO put(@PathVariable("id") Integer id, @RequestBody ProductDTO productDTO) {
		productDTO.setId(id);
		return productService.update(productDTO);
	}

	@GetMapping("/find/{id}")
	public ProductDTO finByID(@RequestBody @PathVariable("id") int id, ProductDTO productDTO) {
		return productService.finById(id);
	}


	@GetMapping("/find-by-category-parent/{id}")
	public List<ProductDTO> getAllProductByParentId(@PathVariable Integer id) {
		return productService.getAllProductByCategoryParent(id);

	}
	@PostMapping("/search")
	public ResponseEntity<?> viewHomePage(Model model, @Param("keyword") String keyword) {
		List<Product> listProducts = productService.listAll(keyword);
		model.addAttribute("listProducts", listProducts);
		model.addAttribute("keyword", keyword);

		return ResponseEntity.ok(listProducts);
	}

}
