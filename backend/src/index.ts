import express from 'express';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(cookieParser()); //parse cookies
app.use(express.json()); //parse application/json

app.use('/api/auth', authRoutes);

app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})