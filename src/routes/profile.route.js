import express from "express";
import { editProfile, getProfile, searchProfile } from "../controller/profile.controller.js";

const profileRouter = express.Router();

profileRouter.put("/", editProfile);
profileRouter.get("/", getProfile);
profileRouter.get("/search", searchProfile);

export default profileRouter;
