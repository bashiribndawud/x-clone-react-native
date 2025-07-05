import mongoose from 'mongoose';
import { ENV } from './env.js';
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log('Connected to MongoDB successfully ✅');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Re-throw the error to be handled by the caller
        
    }
}