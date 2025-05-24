import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      validate: {
        validator: function (arr) {
          return arr.length === 2;
        },
        message: "Chat must have exactly two participants",
      },
      required: true
    },
    lastMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

export const ChatModal = mongoose.model("Chat", chatSchema)