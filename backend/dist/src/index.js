import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { app, server } from './socket/socket.js';
dotenv.config();
const PORT = process.env.PORT || 4001;
const __dirname = path.resolve();
app.use(cookieParser()); //parse cookies
app.use(express.json()); //parse application/json
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
