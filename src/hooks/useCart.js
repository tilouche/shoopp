import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  // 🛒 ADD TO CART
  const addToCart = (product, size, color) => {
    const uniqueId = `${product.id}-${size}-${color}`;

    const existing = cart.find((item) => item.id === uniqueId);

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === uniqueId
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: uniqueId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          qty: 1,
        },
      ]);
    }
  };

  // 🔄 UPDATE QTY
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // 🗑 REMOVE
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🔢 COUNT
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    total,
    count,
  };
}