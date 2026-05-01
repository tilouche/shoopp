import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/products";

export function ProductCard({ product, onAdd }) {
  const colorKeys = product?.colors ? Object.keys(product.colors) : [];

  const [selectedColor, setSelectedColor] = useState(
    colorKeys[0] || ""
  );

  const [current, setCurrent] = useState(0);
  const images = selectedColor ? product.colors[selectedColor] : [];

  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // ➡️ next image
  const next = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // ⬅️ prev image
  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // 🗑️ delete product (admin)
  const deleteProduct = async () => {
    try {
      await axios.delete(`${API}/${product.id}`);
      window.location.reload(); // later نبدلوها refresh state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition w-65">

      {/* 🖼️ IMAGE (SUPABASE READY) */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* arrows فقط إذا عندك colors images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
            >
              ◀
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* COLORS */}
      {colorKeys.length > 0 && (
        <div className="flex gap-2 p-2 justify-center">
          {colorKeys.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setCurrent(0);
              }}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColor === color
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {/* SIZES */}
      <div className="mt-2 px-3">
        <div className="flex gap-2 flex-wrap justify-center">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError("");
              }}
              className={`px-3 py-1 border rounded-full text-sm transition ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* INFO */}
      <div className="p-4">
        <span className="text-xs text-green-600 font-semibold uppercase">
          {product.category}
        </span>

        <h3 className="text-lg font-bold mt-1">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            {product.price} DT
          </span>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              if (!selectedSize) {
                setError("Choisis une taille !");
                return;
              }

              if (!selectedColor && colorKeys.length > 0) {
                setError("Choisis une couleur !");
                return;
              }

              setError("");

              onAdd(product, selectedSize, selectedColor);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm"
          >
            Add to Cart
          </button>

          {/* DELETE */}
          <button
            onClick={deleteProduct}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}