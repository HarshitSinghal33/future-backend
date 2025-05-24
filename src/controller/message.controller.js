import { MessageModal } from "../models/message.modal.js";
import { ChatModal } from "../models/chat.model.js";
import { getIo } from "../socket.js";
const sendMessage = async (req, res) => {
  const { userId: senderId } = req;
  const { receiver, message } = req.body;
  const io = getIo();

  try {
    // Step 1: Try to find an existing chat
    let chat = await ChatModal.findOne({
      participants: { $all: [senderId, receiver], $size: 2 },
    });

    // Step 2: If no chat, create it first
    if (!chat) {
      chat = await ChatModal.create({
        participants: [senderId, receiver],
      });
    }

    // Step 3: Now that chat exists, create the message
    const newMessage = await MessageModal.create({
      chatId: chat._id,
      sender: senderId,
      receiver: receiver,
      message,
    });

    // Step 4: Update the chat with lastMessageId
    chat.lastMessageId = newMessage._id;
    await chat.save();

    io.to(chat._id.toString()).emit("receive_message", newMessage);

    res.status(201).json({ message: newMessage, chatId: chat._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModal.find({ chatId });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { sendMessage, getMessage };
