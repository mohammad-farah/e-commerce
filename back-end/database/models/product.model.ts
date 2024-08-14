import mongoose, { Schema } from 'mongoose';
import { Product } from '../interfaces/product.interface';

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, default: 'https://placehold.co/600x400' },
  },
  { timestamps: true }
);

export default mongoose.model<Product>('Product', ProductSchema) ;