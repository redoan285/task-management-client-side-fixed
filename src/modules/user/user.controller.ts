import type { Request, Response } from "express";
import { userServices } from "./user.service.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const readId = (value: string | string[] | undefined): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null;

const invalidId = (res: Response) =>
  res.status(400).json({ success: false, message: "A valid user ID is required." });

// Create User
const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

// Get All Users
const getAllUsers = catchAsync(async (_req, res) => {
  const result = await userServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully!",
    data: result,
  });
});

// Update User
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = readId(req.params.id);
  if (!id) {
    invalidId(res);
    return;
  }
  const result = await userServices.updateUserInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

// Delete User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = readId(req.params.id);
  if (!id) {
    invalidId(res);
    return;
  }
  const result = await userServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully!",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
