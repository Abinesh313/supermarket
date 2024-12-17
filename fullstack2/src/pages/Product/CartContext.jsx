import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define the initial state and reducer for cart management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return state.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'UPDATE_CART_QUANTITY':
      return state.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.productId !== action.payload.productId);

    default:
      return state;
  }
};

// Create a provider component for the cart context
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const updateCartQuantity = (product, quantityChange) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: product.productId, quantity: quantityChange } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, calculateCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
