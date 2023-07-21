const mongoose = require("mongoose");
const VariantSchema = new mongoose.Schema({
  size: { type: String },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  qtyInStock: { type: Number, required: true },
});
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    variants: [VariantSchema],
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Product", ProductSchema);
