import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/database/database.js";
import authRouter from "./src/routes/auth.route.js";
import profileRouter from "./src/routes/profile.route.js";
import tokenVerification from "./src/middleware/tokenVerification.js";
import chatRouter from "./src/routes/chat.route.js";
import http from "http";
import { initSocket } from "./src/socket.js";
const PORT = process.env.PORT || 3000; // 3000 for local fallback

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocket(server);
app.set("socketio", io);
app.use(express.json());

connectDatabase();

app.use("/api/auth", authRouter);
app.use("/api/profile", tokenVerification, profileRouter);
app.use("/api/chat", tokenVerification, chatRouter);

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
