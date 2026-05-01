import { supabase } from "../config/supabase.js";

// GET all products
export const getProducts = async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// ADD product
export const addProduct = async (req, res) => {
  const { name, price, image } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price, image }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Product deleted" });
};