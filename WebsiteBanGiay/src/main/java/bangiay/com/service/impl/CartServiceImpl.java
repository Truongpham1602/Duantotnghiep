package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import bangiay.com.DTO.CartDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.SizeDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import bangiay.com.service.ProductService;
import bangiay.com.service.SizeService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartDao cartDao;

	@Autowired
	private SizeDao sizeDao;

	@Autowired
	private SizeService sizeService;

	@Autowired
	private ProductService proService;

	@Autowired
	UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CartDTO createCart(CartDTO cartDTO) {
		Cart cart = modelMapper.map(cartDTO, Cart.class);
		cart.setCreated(Timestamp.from(Instant.now()));
		cart.setSize(sizeDao.findById(cartDTO.getSize_Id()).orElse(null));
		cart.setUser(userDao.findById(cartDTO.getUser_Id()).orElse(null));
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
	public List<CartDTO> findByUser_Id(Integer user_Id) {
		List<Cart> lstCart = this.cartDao.findByUser_Id(user_Id);
		List<CartDTO> lstCartDTO = lstCart.stream().map(cart -> modelMapper.map(cart, CartDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < lstCart.size(); i++) {
			lstCartDTO.get(i).setName_Product(lstCart.get(i).getSize().getProduct().getName());
			lstCartDTO.get(i).setPrice(lstCart.get(i).getSize().getProduct().getPrice());
			lstCartDTO.get(i).setQuantityTotal(lstCart.get(i).getSize().getProduct().getQuantity());
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(lstCart.get(i).getSize().getProduct().getId());
			byte[] data = SerializationUtils.serialize(lstSizeDTO);
			lstCartDTO.get(i).setSize(SerializationUtils.deserialize(data));
		}
		return lstCartDTO;
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
	public CartDTO addToCartDTONoUser(CartDTO cartDTO) {
		lstCart.add(cartDTO);
		return cartDTO;
	}

	@Override
	public List<CartDTO> getCartNoUser() {
		for (int i = 0; i < lstCart.size(); i++) {
			SizeDTO size = this.sizeService.findById(lstCart.get(i).getSize_Id());
			ProductDTO pro = this.proService.finById(size.getProductId());
			lstCart.get(i).setName_Product(pro.getName());
			lstCart.get(i).setPrice(pro.getPrice());
			lstCart.get(i).setQuantityTotal(pro.getQuantity());
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(pro.getId());
			byte[] data = SerializationUtils.serialize(lstSizeDTO);
			lstCart.get(i).setSize(SerializationUtils.deserialize(data));
		}
		return lstCart;
	}
}
