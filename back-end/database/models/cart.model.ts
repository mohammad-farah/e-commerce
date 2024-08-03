import mongoose, { Schema } from 'mongoose';
import { Cart } from '../interfaces/cart.interface';

const CartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Cart>('Cart', CartSchema) ;
