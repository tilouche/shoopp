import { useState } from "react";
import axios from "axios";
import { supabase } from "../lib/supabase";

const API = "https://shoopp.onrender.com";

export default function AdminPanel({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [file, setFile] = useState(null);

  // 📤 upload image to supabase
  const uploadImage = async () => {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  const addProduct = async () => {
    let imageUrl = "";

    if (file) {
      imageUrl = await uploadImage();
    }

    await axios.post(API, {
      name: form.name,
      price: Number(form.price),
      image: imageUrl,
    });

    setForm({ name: "", price: "" });
    setFile(null);
    refresh();
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="font-bold mb-3">➕ Add Product</h2>

      {/* NAME */}
      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        placeholder="Price"
        className="border p-2 w-full mb-2"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      {/* IMAGE FILE */}
      <input
        type="file"
        className="mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={addProduct}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Upload & Add
      </button>
    </div>
  );
}