package bangiay.com.service;

import bangiay.com.entity.Cart;

import java.util.List;

public interface CartService {
    List<Cart> getAll();

    Cart save(Cart cart);

    Cart getById(Integer id);

    Cart update(Cart cart);

    void deleteById(Integer id);
}
