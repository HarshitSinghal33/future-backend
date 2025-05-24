import { ERROR_MESSAGES } from "../constants/Messages.js";
import { UserAuthModal } from "../models/profile.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginService = async (email, password) => {
  const findUser = await UserAuthModal.findOne({ email }).select("+password");
  if (!findUser) {
    console.log('user not found');
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const isMatch = bcrypt.compare(password, findUser.password);

  if (!isMatch) {    
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  } else {
    const SECRET = process.env.SECRET;
    const token = jwt.sign({userId: findUser._id}, SECRET, { expiresIn: "7d" });
    return token;
  }
};

const registerService = async (email, password) => {
  const findEmail = await UserAuthModal.findOne({ email });
  if (findEmail) {
    throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
  }
  const newUser = new UserAuthModal({ email, password });
  await newUser.save();

  const SECRET = process.env.SECRET;
  const token = jwt.sign({userId: newUser._id}, SECRET, { expiresIn: "7d" });

  return token;
};

export { registerService, loginService };
