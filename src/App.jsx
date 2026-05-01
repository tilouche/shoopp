import { useState } from "react";
import { products } from "./data/products";
import { useCart } from "./hooks/useCart";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function App() {
  const { cart, addToCart, removeFromCart, updateQty, total, count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-green-600">🛍 ahmed</h1>
        <button
          onClick={() => setCartOpen(true)}
          className="relative bg-green-500 text-white px-4 py-2 rounded-xl font-semibold"
        >
          🛒 Panier
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </nav>

      {/* Hero */}
      
      {/* Products */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </main>
        {/* Services Section */}
<section className="bg-[#93C069] text-white py-12 text-white py-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

    <div>
      <div className="text-4xl mb-2">🏠</div>
      <h4 className="font-bold">LIVRAISON À DOMICILE</h4>
      <p className="text-sm">Toute la Tunisie</p>
    </div>

    <div>
      <div className="text-4xl mb-2">🚚</div>
      <h4 className="font-bold">LIVRAISON RAPIDE</h4>
      <p className="text-sm">Livraison en 1 à 3 jours</p>
    </div>

    <div>
      <div className="text-4xl mb-2">💵</div>
      <h4 className="font-bold">PAIEMENT CASH</h4>
      <p className="text-sm">Main à main</p>
    </div>

  </div>
  </section>
  {/* Footer */}
<footer className="bg-gray-200 py-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">

    {/* Logo + Info */}
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-yellow-700">Ahmed</h2>
      <p className="mt-2">Lundi au Dimanche<br/>9h à 21h</p>
      <p className="mt-2">+216 *******</p>
      <p>ahmed12tilouche@gmail.com</p>
    </div>

    {/* Categories */}
    <div className="flex flex-col gap-2">
      <h4 className="font-bold mb-2">Catégories</h4>
      <p>T-shirt</p>
      <p>Short</p>
      <p>ENFANT</p>
    </div>

    {/* Resources */}
    <div className="flex flex-col gap-2">
      <h4 className="font-bold mb-2">Resources</h4>
      <p>Notre histoire</p>
      <p>Contactez-nous</p>
      <p>Livraison a domicile</p>
    </div>

    {/* Social */}
    <div className="flex flex-col items-center justify-center">
  <h4 className="font-bold mb-2">Social Media</h4>

  <a 
    href="https://www.facebook.com/ahmed.tilouche.3" 
    target="_blank"
    className="flex items-center gap-2 hover:text-blue-600"
  >
    <FaFacebook /> Facebook
  </a>

  <a 
    href="https://www.instagram.com/ahmed_tilouche/" 
    target="_blank"
    className="flex items-center gap-2 hover:text-pink-500"
  >
    <FaInstagram /> Instagram
  </a>

  <a 
    href="https://www.instagram.com/ahmed_tilouche/" 
    target="_blank"
    className="flex items-center gap-2"
  >
    <FaTiktok /> TikTok
  </a>

  <a 
    href="https://wa.me/21624483194" 
    target="_blank"
    className="flex items-center gap-2 hover:text-green-600"
  >
    <FaWhatsapp /> WhatsApp
  </a>
</div>

  </div>
</footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setCartOpen(false)} />
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