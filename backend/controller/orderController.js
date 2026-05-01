import { supabase } from "../config/supabase.js";

export const createOrder = async (req, res) => {
  const { items, total, customer_name, phone } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        items,
        total,
        customer_name,
        phone,
        status: "pending",
      },
    ])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const getOrders = async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};