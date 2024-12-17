package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    public Cart addToCart(Cart cart) {
        return cartRepo.save(cart);
    }

    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    public Cart getCartById(int cartId) {
        return cartRepo.findById(cartId).orElse(null);
    }

    public Cart updateCart(Cart cart) {
        return cartRepo.save(cart);
    }

    public void deleteCart(int cartId) {
        cartRepo.deleteById(cartId);
    }
}
