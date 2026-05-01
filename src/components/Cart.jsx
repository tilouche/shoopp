import { sendToWhatsApp } from "../utils/whatsapp";

export function Cart({ cart, updateQty, removeFromCart, total, onClose }) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col">
      
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your order</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Cart is empty
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-center gap-3"
          >
            <img
              src={item.image}
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-sm">{item.name}</p>

              <p className="text-xs text-gray-500">
                Size: {item.selectedSize} | Color: {item.selectedColor}
              </p>

              <p className="text-green-600 font-bold">
                DT {item.price}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    updateQty(item.cartItemId, item.quantity - 1)
                  }
                  className="w-6 h-6 bg-gray-100 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQty(item.cartItemId, item.quantity + 1)
                  }
                  className="w-6 h-6 bg-gray-100 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item.cartItemId)}
              className="text-red-400 hover:text-red-600"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>{total.toFixed(2)} DT</span>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={() => sendToWhatsApp(cart, total)}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          📲 Order via WhatsApp
        </button>
      </div>
    </div>
  );
}