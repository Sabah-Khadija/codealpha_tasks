import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  oldPrice: Number,
  colors: [String],
  sizes: [Number],
  badge: String, // ex "PROMO", "NOUVEAU"
  rating: Number,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});



export default mongoose.model("Product", productSchema);
