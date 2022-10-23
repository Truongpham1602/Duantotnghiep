package bangiay.com.service;

import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.entity.Cart;

import java.util.List;

public interface CartService {
    CartDTO createCart(CartDTO cartDTO);
    List<ResponCartDTO> findAll();
    //Page<User> findAll(Pageable pageable);
    CartDTO updateCart(CartDTO cartDTO);
    void deleteById(Integer id);
    Cart findByID(Integer id);
}
