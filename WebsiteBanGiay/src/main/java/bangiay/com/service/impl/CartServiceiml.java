package bangiay.com.service.impl;

import bangiay.com.dao.CartDao;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceiml implements CartService {

    private CartDao cartDao;

    public CartServiceiml(CartDao cartDao) {
        super();
        this.cartDao = cartDao;
    }
    @Override
    public List<Cart> getAll() {
        return cartDao.findAll();
    }

    @Override
    public Cart save(Cart cart) {
        return cartDao.save(cart);
    }

    @Override
    public Cart getById(Integer id) {
        return cartDao.findById(id).get();
    }

    @Override
    public Cart update(Cart cart) {
        return cartDao.save(cart);
    }

    @Override
    public void deleteById(Integer id) {
        cartDao.deleteById(id);
    }
}
