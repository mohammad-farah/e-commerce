import { Document, ObjectId } from 'mongoose';

interface CartProduct {
  productId: ObjectId;
  quantity: number;
}

export interface Cart extends Document {
  userId: ObjectId;
  products: CartProduct[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
