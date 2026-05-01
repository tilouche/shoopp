import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "./lib/supabase";

import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { useCart } from "./hooks/useCart";

const API = "https://shoopp.onrender.com";

export default function App() {
  const { cart, addToCart, removeFromCart, updateQty, total, count } =
    useCart();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 check session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  // 🚀 fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🚪 logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // 🔐 if not logged in → LOGIN PAGE
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="font-bold text-green-600">🛍 Shop Admin</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Cart ({count})
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ADMIN PANEL */}
      <div className="max-w-5xl mx-auto p-4">
        <AdminPanel refresh={fetchProducts} />
      </div>

      {/* PRODUCTS */}
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))
        )}
      </div>

      {/* CART */}
      {cartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          <Cart
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            total={total}
            onClose={() => setCartOpen(false)}
          />
        </>
      )}
    </div>
  );
}