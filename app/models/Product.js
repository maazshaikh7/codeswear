const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  qtyInStock: { type: Number, required: true },
});

const ColorVariantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  sizes: [SizeSchema],
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    colorVariants: [ColorVariantSchema],
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);
