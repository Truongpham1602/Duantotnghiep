package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.CartDTO;
import bangiay.com.entity.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CartService {

	CartDTO createCart(CartDTO cartDTO);

	List<CartDTO> findAll();

	Page<CartDTO> findAll(Pageable pageable);

	CartDTO updateCart(CartDTO cartDTO);

	void deleteById(Integer id);

	Cart findByID(Integer id);

	List<CartDTO> addToCartDTONoUser(CartDTO cartDTO);

	List<CartDTO> getCartNoUser();

	List<CartDTO> findByUser_Id(Integer user_Id);
//    List<CartDTO> getCartNoUser();

}
