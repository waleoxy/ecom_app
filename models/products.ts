import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  images: { type: [String] },
});

export const Product = models.Product || model("Product", ProductSchema);
