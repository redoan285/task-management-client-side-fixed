import { Router } from "express";
import { userControllers } from "./user.controller.js";

const router = Router();

router.post("/create-user", userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.patch("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
