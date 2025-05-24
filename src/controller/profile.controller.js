import { UserAuthModal } from "../models/profile.model.js";
import { profileEditService } from "../service/profile.service.js";

export const getProfile = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserAuthModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
export const editProfile = async (req, res) => {
  const { name, username, avatar } = req.body;
  const userId = req.userId;
  if (!name || !username ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (name.length < 3 || name.length > 20) {
    return res
      .status(400)
      .json({ message: "Display name must be between 3 and 20 characters" });
  }
  if (username.length < 3 || username.length > 20) {
    return res
      .status(400)
      .json({ message: "User name must be between 3 and 20 characters" });
  }

  try {
    await profileEditService(userId, name, username, avatar);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(200).json({ message: "Profile updated successfully" });
};

export const searchProfile = async (req, res) => {
  const { query } = req.query;
  const currentUserId = req.userId;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const users = await UserAuthModal.find({
      $and: [
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
        { _id: { $ne: currentUserId } },
      ],
    }).limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
