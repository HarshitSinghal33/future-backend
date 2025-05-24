import { UserAuthModal } from "../models/profile.model.js";

export const profileEditService = async (userId, name, username, avatar) => {    
    const user = await UserAuthModal.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.name = name;
    user.username = username;    
    user.avatar = avatar;
    await user.save();
}