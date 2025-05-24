import express from 'express';
import { getChat } from '../controller/chat.controller.js';
import { getMessage, sendMessage } from '../controller/message.controller.js';

const chatRouter = express.Router();
chatRouter.get('/:chatId', getMessage);
chatRouter.get('/', getChat);
chatRouter.post('/', sendMessage);
export default chatRouter;