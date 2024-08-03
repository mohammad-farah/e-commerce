import mongoose from 'mongoose';

const MONGO_URI = `mongodb://username:password@host:port/database`;

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