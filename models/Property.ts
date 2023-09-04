import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
  name: { type: String },
  values: { type: [String] },
});

export const Property = models.Property || model("Property", PropertySchema);
