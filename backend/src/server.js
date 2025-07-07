import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from '@clerk/express';

import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import notificationRoutes from "./routes/notification.route.js"

import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware())



app.get("/", (req, res) => {
  res.send("Welcome to the X Clone API");
})

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notification', notificationRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});




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