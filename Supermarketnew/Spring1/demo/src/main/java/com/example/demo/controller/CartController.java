package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.service.CartService;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL if different
public class CartController {

    private final CartService cartService;

    // @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @CrossOrigin(origins = "http://localhost:5173") // Allow CORS requests from this origin
    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
        Cart newCart = cartService.addToCart(cart);
        return ResponseEntity.ok(newCart);  // Return 200 OK with the newly created cart
    }

    @CrossOrigin(origins = "http://localhost:5173") // Allow CORS requests from this origin
    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);  // Return 200 OK with the list of all carts
    }

    @CrossOrigin(origins = "http://localhost:5173") // Allow CORS requests from this origin
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable int id) {
        Cart cart = cartService.getCartById(id);
        if (cart != null) {
            return ResponseEntity.ok(cart);  // Return 200 OK with the cart details if found
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if the cart was not found
        }
    }

    @CrossOrigin(origins = "http://localhost:5173") // Allow CORS requests from this origin
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable int id, @RequestBody Cart cart) {
        cart.setCartId(id);  // Set the cart ID to ensure it updates the correct record
        Cart updatedCart = cartService.updateCart(cart);
        return ResponseEntity.ok(updatedCart);  // Return 200 OK with the updated cart
    }

    @CrossOrigin(origins = "http://localhost:5173") // Allow CORS requests from this origin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable int id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();  // Return 204 No Content when successfully deleted
    }
}
