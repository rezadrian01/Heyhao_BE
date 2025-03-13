import { SigninValues, SignupValues } from "../utils/schema/user";
import * as userRepositories from "../repositories/userRepositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (data: SignupValues, file: Express.Multer.File) => {
  const isEmailExist = await userRepositories.isEmailExist(data.email);
  if (isEmailExist > 1) {
    throw new Error("Email already taken");
  }

  const user = await userRepositories.createUser(
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

export const signin = async (data: SigninValues) => {
  const isEmailExist = await userRepositories.isEmailExist(data.email);
  if (isEmailExist === 0) {
    throw new Error("Email isn't registered");
  }

  const user = await userRepositories.findUserByEmail(data.email);
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw new Error("Email or password is wrong");
  }
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
