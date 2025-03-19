import express from "express";
import multer from "multer";
import { storageUserPhoto } from "../utils/multer";
import * as userController from "../controllers/userController";

const userRoutes = express.Router();

const uploadPhoto = multer({
  storage: storageUserPhoto,
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, false);
    }
    cb(null, true);
  },
});

userRoutes.post(
  "/auth/sign-up",
  uploadPhoto.single("photo"),
  userController.signUp
);

userRoutes.post("/auth/sign-in", userController.signIn);
userRoutes.post("/auth/password-reset", userController.getEmailReset);
userRoutes.post("/auth/reset-password/:token", userController.resetPassword);

export default userRoutes;
