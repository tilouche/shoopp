import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  status: {
    type: String,
    default: "nouveau"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);