import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart data from localStorage", error);
      }
    }
  }, []); // Only run once when the component mounts

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Remove the cart if it's empty
    }
  }, [cart]);

  const toggleButton = (book) => {
    const existingBook = cart.find((item) => item.id === book.id);
    return !!existingBook;
  };

  const addToCart = (book) => {
    setCart((previousCart) => {
      const existingBook = previousCart.find((item) => item.id === book.id);
      if (existingBook) {
        return previousCart;
      } else {
        return [...previousCart, { ...book }];
      }
    });
  };

  const removeFromCart = (id, setOrder) => {
    setOrder(false);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change, setOrder) => {
    setOrder(false);
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
              totalPrice: (
                Math.max(1, item.quantity + change) * item.price
              ).toFixed(2),
            }
          : item
      )
    );
  };

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + (parseFloat(item.totalPrice) || 0),
      0
    );
    setGrandTotal(total.toFixed(2)); // Update grand total
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        grandTotal,
        updateQuantity,
        clearCart,
        toggleButton,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
