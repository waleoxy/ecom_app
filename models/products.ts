import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  images: { type: [String] },
  property: { type: Object },
});

export const Product = models.Product || model("Product", ProductSchema);
