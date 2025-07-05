import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
const app = express();


app.get("/", (req, res) => {
  res.send("Welcome to the X Clone API");
})



const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB successfully ✅');
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();