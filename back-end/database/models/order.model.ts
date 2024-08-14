import mongoose, { Schema } from 'mongoose';
import { Order } from '../interfaces/order.interface';

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shipping_details: {
      received_by: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default : '' },
      zipCode: { type: String, default : '00000' },
      country: { type: String, required: true },
      phone: { type: String, required: true },

    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<Order>('Order', OrderSchema);
