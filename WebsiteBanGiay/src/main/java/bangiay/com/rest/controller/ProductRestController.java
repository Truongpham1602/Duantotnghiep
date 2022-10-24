package bangiay.com.rest.controller;


import bangiay.com.DTO.ProductDTO;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import bangiay.com.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Cart")
public class ProductRestController {
    @Autowired
    CartService cartService;
//    @GetMapping("/index")
//    public List<Cart>cartList(){
//        return cartService.findAll();
//    }
//    @PostMapping("/create")
//    public Cart cartcreate(@RequestBody Cart cart){
//        return cartService.createCart(cart);
//    }

	@Autowired
	ProductService productService;

	@GetMapping("/index")
	public List<ProductDTO> findAll() {
		return productService.findAll();
	}
	
	@DeleteMapping("/delete?{id}")
	public void delete(@PathVariable("id") Long id) {
		productService.delete(id);
	}
	
	@PostMapping("/post")
	public ProductDTO post(@RequestBody ProductDTO productDTO) {
		return productService.save(productDTO);
	}
	
	@PutMapping("/put?{id}")
	public ProductDTO put(@RequestBody @PathVariable("id") Long id, ProductDTO productDTO) {
		return productService.save(productDTO);
	}
}
