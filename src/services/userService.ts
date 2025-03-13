import { SignupValues } from "../utils/schema/user";
import * as UserRepositories from "../repositories/userRepositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (data: SignupValues, file: Express.Multer.File) => {
  const isEmailExist = await UserRepositories.isEmailExist(data.email);
  if (isEmailExist > 1) {
    throw new Error("Email already taken");
  }

  const user = await UserRepositories.createUser(
    {
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    },
    file.filename
  );
  const token = jwt.sign({ id: user.id }, process.env.SECRET_AUTH ?? "", {
    expiresIn: "1 days",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo_url,
    token,
  };
};
