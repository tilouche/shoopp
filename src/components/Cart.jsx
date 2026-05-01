import { useState } from "react";
import axios from "axios";

const API = "https://shoopp.onrender.com";
updateQty(item.id, item.qty + 1)

export function Cart({
  cart,
  updateQty,
  removeFromCart,
  total,
  onClose,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // 🛒 checkout
  const checkout = async () => {
    if (!name || !phone) {
      alert("Enter your name and phone");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API, {
        items: cart,
        total,
        customer_name: name,
        phone,
      });

      alert("✅ Order placed successfully!");

      onClose();
      window.location.reload(); // تنجم تنحيها later
    } catch (err) {
      console.log(err);
      alert("❌ Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 w-96 max-w-full bg-white h-full shadow-xl z-50 p-4 flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🛒 Cart</h2>
        <button onClick={onClose} className="text-red-500">
          ✖
        </button>
      </div>

      {/* CART ITEMS */}
      <div className="flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Your cart is empty
          </p>
        ) : (
          cart.map((item, i) => (
            <div
              key={i}
              className="border-b py-3 flex gap-3 items-center"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                className="w-16 h-16 object-cover rounded"
              />

              {/* INFO */}
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>

                <p className="text-sm text-gray-500">
                  {item.price} DT
                </p>

                {/* SIZE + COLOR */}
                <p className="text-xs text-gray-400">
                  {item.size} / {item.color}
                </p>

                {/* QTY */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQty(item.id, item.qty - 1)
                    }
                    className="px-2 bg-gray-200"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.qty + 1)
                    }
                    className="px-2 bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      <div className="border-t pt-3">
        <p className="font-bold text-lg">
          Total: {total} DT
        </p>

        {/* FORM */}
        <input
          placeholder="Your name"
          className="border w-full p-2 mt-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone number"
          className="border w-full p-2 mt-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* CHECKOUT */}
        <button
          onClick={checkout}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 mt-3 rounded font-semibold"
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}