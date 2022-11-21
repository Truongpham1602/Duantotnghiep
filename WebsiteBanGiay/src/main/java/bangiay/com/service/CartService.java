package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.CartDTO;
import bangiay.com.entity.Cart;

public interface CartService {

	CartDTO createCart(CartDTO cartDTO);

	List<CartDTO> findAll();

	// Page<User> findAll(Pageable pageable);
	CartDTO updateCart(CartDTO cartDTO);

	void deleteById(Integer id);

	Cart findByID(Integer id);

	CartDTO addToCartDTONoUser(CartDTO cartDTO);

	List<CartDTO> getCartNoUser();

	List<CartDTO> findByUser_Id(Integer user_Id);
//    List<CartDTO> getCartNoUser();

}
