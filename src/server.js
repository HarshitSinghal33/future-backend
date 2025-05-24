import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./database/database.js";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.route.js";
import tokenVerification from "./middleware/tokenVerification.js";
import chatRouter from "./routes/chat.route.js";
import http from "http";
import { initSocket } from "./socket.js";

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

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
