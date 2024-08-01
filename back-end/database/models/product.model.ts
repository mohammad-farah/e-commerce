import mongoose, { Schema } from 'mongoose';
import { Product } from '../interfaces/product.interface';

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Product>('Product', ProductSchema);