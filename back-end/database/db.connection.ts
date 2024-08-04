import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const USERNAME = process.env.DB_USERNAME 
// const PASSWORD = process.env.DB_PASSWORD 

const HOST = process.env.DB_HOST
const PORT = process.env.DB_PORT 
const DATABASE = process.env.DB_NAME

const MONGO_URI = `mongodb://${HOST}:${PORT}/${DATABASE}`;

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB connected successfully.');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export default dbConnection;