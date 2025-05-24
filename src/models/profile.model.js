import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: "User",
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatar: {
    type: String,
    default: "",
  },
}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserAuthModal = mongoose.model("User", userSchema);
