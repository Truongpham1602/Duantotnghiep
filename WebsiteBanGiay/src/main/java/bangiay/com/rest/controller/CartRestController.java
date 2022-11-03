package bangiay.com.rest.controller;

import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.controller.CartController;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "cart")

public class CartRestController {
    @Autowired
    private CartService cartService;
    @Autowired
    private ModelMapper modelMapper;

    public CartRestController(CartService cartService, ModelMapper modelMapper) {
        this.cartService = cartService;
        this.modelMapper = modelMapper;
    }

    private static Logger logger = LoggerFactory.getLogger(CartController.class);

    @JsonIgnore
    @GetMapping("/getAllCart")
    public ResponseEntity<List<ResponCartDTO>> findAll() {
        return ResponseEntity.ok().body(cartService.findAll());

    }
    @GetMapping("/getOneById")
    public CartDTO getOneById(@RequestParam("id") Integer id, CartDTO cartDTO) {
        return cartService.findByID(id);
    }
    @PostMapping(value = "/update")
    public ResponseEntity<CartDTO> update(@RequestParam(name = "id") Integer id, @RequestBody CartDTO cartDTO) {
        cartDTO.setId(id);

        return ResponseEntity.ok().body(cartService.updateCart(cartDTO));
    }
    @PostMapping(value = "/create")
    public ResponseEntity<CartDTO> create(@RequestBody CartDTO dto) {
        return ResponseEntity.ok().body(cartService.createCart(dto) );
    }
    @PostMapping(value = "/delete")
    public ResponseEntity<String> delete(@RequestParam(name = "id") Integer id) {
        logger.info("Deleted cart with id : " + id);
        cartService.deleteById(id);
        return ResponseEntity.ok().body("Delete cart id " + id + " successfully!");
    }
}
