package bangiay.com.controller;

import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CartController {
    private CartService cartService;

    public CartController(CartService cartService) {
        super();
        this.cartService = cartService;
    }
    @GetMapping("/cart")
    public String listcart(Model model) {
        model.addAttribute("cart", cartService.getAll());
        return "cart";
    }
    @GetMapping("/cart/new")
    public String createCartForm(Model model) {

        // create cart object to hold cart form data
        Cart cart = new Cart();
        model.addAttribute("cart", cart);
        return "create_cart";

    }
    @PostMapping("/cart")
    public String saveCart(@ModelAttribute("cart") Cart cart) {
        cartService.save(cart);
        return "redirect:/cart";
    }

    @GetMapping("/cart/edit/{id}")
    public String editCartForm(@PathVariable Integer id, Model model) {
        model.addAttribute("cart", cartService.getById(id));
        return "edit_cart";
    }

    @PostMapping("/cart/{id}")
    public String updateCart(@PathVariable Integer id,
                                @ModelAttribute("cart") Cart cart,
                                Model model) {

        // get cart from database by id
        Cart existingcart = cartService.getById(id);
        existingcart.setId(id);
        existingcart.setUserId(cart.getUserId());
        existingcart.setSizeId(cart.getSizeId());
        existingcart.setQuantity(cart.getQuantity());
        existingcart.setCreated(cart.getCreated());
        existingcart.setCreator(cart.getCreator());
        existingcart.setModified(cart.getModified());
        existingcart.setModifier(cart.getModifier());
        existingcart.setStatus(cart.getStatus());

        // save updated cart object
        cartService.update(existingcart);
        return "redirect:/cart";
    }

    // handler method to handle delete cart request

    @GetMapping("/cart/{id}")
    public String deletecart(@PathVariable Integer id) {
        cartService.deleteById(id);
        return "redirect:/cart";
    }
}
