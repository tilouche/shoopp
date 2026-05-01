import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, color) => {
    if (!size || !color) return;

    const cartItemId = `${product.id}-${size}-${color}`;

    setCart((prev) => {
      const index = prev.findIndex((p) => p.cartItemId === cartItemId);

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          selectedColor: color,
          cartItemId,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQty = (cartItemId, qty) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: qty }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const count = cart.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    total,
    count,
  };
}