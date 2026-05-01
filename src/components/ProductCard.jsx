import { useState } from "react";
export function ProductCard({ product, onAdd }) {

  const colorKeys = product?.colors ? Object.keys(product.colors) : [];
  const [selectedColor, setSelectedColor] = useState(colorKeys[0]||"");
  const [current, setCurrent] = useState(0);
  const images = selectedColor ? product.colors[selectedColor] : [];

  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const next = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition w-65">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={images[current]}
          alt={product.name}
          className="w-full h-77 object-cover"
        />

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
      

      {/* 🎨 COLORS */}
      <div className="flex gap-2 p-2 justify-center">
        {colorKeys.map((color) => (
          <button
            key={color}
            onClick={() => {
              setSelectedColor(color);
              setCurrent(0);
            }}
            className={`w-6 h-6 rounded-full border-2 ${
              selectedColor === color ? "border-black" : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
        {/* size */}
      <div className="mt-4">
  <h4 className="font-semibold mb-2">Taille</h4>

  <div className="flex gap-2 flex-wrap">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => {
          setSelectedSize(size);
          setError(""); // يمسح error وقت الاختيار
        }}
        className={`px-4 py-2 border rounded-full transition-all duration-200
          ${
            selectedSize === size
              ? "bg-black text-white scale-105 border-black"
              : "bg-white text-black hover:bg-gray-100 border-gray-300"
          }
        `}
      >
        {size}
      </button>
    ))}
  </div>

  {/* 🔴 error message */}
  {error && (
    <p className="text-red-500 text-sm mt-2 animate-pulse">
      ⚠️ {error}
    </p>
  )}
</div>

      {/* 📦 INFO */}
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
          <span className="text-xl font-bold text-gray-800">
            {product.price} DT
          </span>

         <button
  onClick={() => {
    if (!selectedSize) {
      setError("⚠️ Choisis une taille !");
      return;
    }

    if (!selectedColor) {
      setError("⚠️ Choisis une couleur !");
      return;
    }

    setError("");
    onAdd(product, selectedSize, selectedColor);
  }}
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
>
  Ajouter au Panier
</button>
        </div>
      </div>
    </div>
  );
}