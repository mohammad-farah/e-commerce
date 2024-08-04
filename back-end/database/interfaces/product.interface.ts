import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rate?: number
  createdAt: Date;
  updatedAt: Date;
}