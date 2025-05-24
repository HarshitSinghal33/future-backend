import { ChatModal } from "../models/chat.model.js";

const getChat = async (req, res) => {
  const { userId } = req;
  const chat = await ChatModal.find({
    participants: { $in: [userId] },
  }).populate("participants").populate("lastMessageId");

  res.status(200).json(chat);
};

export { getChat };
