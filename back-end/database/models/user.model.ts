import mongoose, { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
);

export default  mongoose.model<User>('User', UserSchema) ;