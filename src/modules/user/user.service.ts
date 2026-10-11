import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";

const publicUserSelect = {
  id: true,
  name: true,
  profile: true,
  status: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

const createUserIntoDB = async (payload: unknown) => {
  const input = createUserSchema.parse(payload);
  const password = await bcrypt.hash(input.password, 12);
  const data = {
    name: input.name,
    email: input.email,
    password,
    ...(input.profile !== undefined ? { profile: input.profile } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
  };
  return prisma.user.create({
    data,
    select: publicUserSelect,
  });
};

const getAllUserFromDB = async () =>
  prisma.user.findMany({ select: publicUserSelect });

const updateUserInDB = async (id: string, payload: unknown) => {
  const input = updateUserSchema.parse(payload);
  const data = {
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.email !== undefined ? { email: input.email } : {}),
    ...(input.profile !== undefined ? { profile: input.profile } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.password !== undefined
      ? { password: await bcrypt.hash(input.password, 12) }
      : {}),
  };
  return prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  });
};

const deleteUserFromDB = async (id: string) =>
  prisma.user.delete({ where: { id }, select: publicUserSelect });

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
