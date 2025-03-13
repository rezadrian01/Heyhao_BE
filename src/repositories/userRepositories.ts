import { RoleType } from "@prisma/client";
import prisma from "../utils/prisma";
import { SignupValues } from "../utils/schema/user";

export const isEmailExist = async (email: string) => {
  return await prisma.user.count({
    where: {
      email: email,
    },
  });
};

export const findRole = async (role: RoleType) => {
  return await prisma.role.findFirstOrThrow({
    where: {
      role: role,
    },
  });
};

export const createUser = async (data: SignupValues, photo: string) => {
  const role = await findRole("USER");
  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      role_id: role.id,
      photo,
    },
  });
};
