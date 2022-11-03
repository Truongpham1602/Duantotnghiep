package bangiay.com.service.impl;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Cart;
import bangiay.com.entity.User;
import bangiay.com.service.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceiml implements CartService {

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
        Cart cart= modelMapper.map(cartDTO, Cart.class);
        cart.setCreated(Timestamp.from(Instant.now()));
        System.out.println(cartDTO.getSize_id());
        if (cartDTO.getSize_id() == null){
            System.out.println("tronggggggggggg");
        }
        cart.setSIZE_ID(sizeDao.findById(cartDTO.getSize_id()).orElse(null));
        cart.setUSER_ID(userDao.findById(cartDTO.getUser_id()).orElse(null));
        Cart cartSave = cartDao.save(cart);
        cartDTO.setCreator(cartSave.getCreator());
        cartDTO.setModifier(cartSave.getModifier());
        cartDTO.setId(cartSave.getId());
        return cartDTO;
    }
    @Override
    public CartDTO updateCart(CartDTO cartDTO) {
            Cart cart = cartDao.findById(cartDTO.getId()).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
            //modelMapper.map(cartDTO,Cart.class);
            cart.setQuantity(cartDTO.getQuantity());
            cart.setModified(Timestamp.from(Instant.now()));
            cart.setStatus(1);
            Cart cartSave = cartDao.save(cart);
            cartDTO.setCreator(cartSave.getCreator());
            cartDTO.setModifier(cartSave.getModifier());
            cartDTO.setId(cartSave.getId());
            //return modelMapper.map(cart, CartDTO.class);
        return cartDTO;
    }

    @Override
    public List<ResponCartDTO>findAll() {
        List<Cart> cartList = cartDao.findAll();
        List<ResponCartDTO> responCartDTOList = new ArrayList<>();
        ResponCartDTO responCartDTO = new ResponCartDTO();
        for (int i = 0; i < cartList.size(); i++) {
            responCartDTO.setStatus(cartList.get(i).getStatus());
            responCartDTO.setQuantity(cartList.get(i).getQuantity());
            responCartDTO.setModifier(cartList.get(i).getModifier());
            responCartDTO.setCreator(cartList.get(i).getCreator());
            responCartDTO.setUser_id(cartList.get(i).getUSER_ID().getId());
            responCartDTO.setSize_id(cartList.get(i).getSIZE_ID().getId());
            responCartDTOList.add(responCartDTO);
        }
        return responCartDTOList;
    }



    @Override
    public void deleteById(Integer id) {
        Cart cart = cartDao.findById(id).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
        cart.setStatus(0);
        cartDao.save(cart);
    }

    @Override
    public CartDTO findByID(Integer id) {
//        Cart cart = cartDao.findById(id).get();
//        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
//        return cartDTO;
          Cart cart = cartDao.findById(id).get();
          CartDTO cartDTO = new CartDTO();
        cartDTO.setStatus(cart.getStatus());
        cartDTO.setQuantity(cart.getQuantity());
        cartDTO.setModifier(cart.getModifier());
        cartDTO.setCreator(cart.getCreator());
        cartDTO.setUser_id(cart.getUSER_ID().getId());
        cartDTO.setSize_id(cart.getSIZE_ID().getId());

        return cartDTO;
    }
}
