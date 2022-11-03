package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.request.CartDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartDao cartDao;

	@Autowired
	private SizeDao sizeDao;

	@Autowired
	UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CartDTO createCart(CartDTO cartDTO) {
		Cart cart = modelMapper.map(cartDTO, Cart.class);
		cart.setCreated(Timestamp.from(Instant.now()));
		cart.setSIZE_ID(sizeDao.findById(cartDTO.getSize_id()).orElse(null));
		cart.setUSER_ID(userDao.findById(cartDTO.getUser_id()).orElse(null));
		Cart cartSave = cartDao.save(cart);
//		cartDTO.setCreator(cartSave.getCreator());
//		cartDTO.setModifier(cartSave.getModifier());
		cartDTO.setId(cartSave.getId());
		return cartDTO;
	}

	@Override
	public CartDTO updateCart(CartDTO cartDTO) {
		Cart cart = cartDao.findById(cartDTO.getId()).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
		// modelMapper.map(cartDTO,Cart.class);
		cart.setQuantity(cartDTO.getQuantity());
		cart.setModified(Timestamp.from(Instant.now()));
		cart.setStatus(1);
		Cart cartSave = cartDao.save(cart);
//		cartDTO.setCreator(cartSave.getCreator());
//		cartDTO.setModifier(cartSave.getModifier());
		cartDTO.setId(cartSave.getId());
		// return modelMapper.map(cart, CartDTO.class);
		return cartDTO;
	}

	@Override
	public List<CartDTO> findAll() {

		return cartDao.findAll().stream().map(cart -> modelMapper.map(cart, CartDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void deleteById(Integer id) {
		Cart cart = cartDao.findById(id).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
		cart.setStatus(0);
		cartDao.save(cart);
	}

	@Override
	public Cart findByID(Integer id) {
		return cartDao.findById(id).orElseThrow(() -> new RuntimeException("User isn't existed"));
	}

	private List<CartDTO> lstCart = new ArrayList<CartDTO>();

	@Override
	public List<CartDTO> addToCartDTONoUser(CartDTO cartDTO) {
		lstCart.add(cartDTO);
		return lstCart;
	}

	@Override
	public List<CartDTO> getCartNoUser() {
		return lstCart;
	}
}
