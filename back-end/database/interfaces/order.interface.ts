import { Document, ObjectId } from 'mongoose';

interface OrderProduct {
  productId: ObjectId;
  quantity: number;
}

export interface Order extends Document {
  userId: ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  shippingDetails: {
    received_by :string
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
