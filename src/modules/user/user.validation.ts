import { z } from "zod";

const passwordSchema = z.string().min(8, "Password must be at least 8 characters long.");

export const createUserSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.email(),
    password: passwordSchema,
    profile: z.string().optional(),
    status: z.enum(["active", "blocked"]).optional(),
  })
  .strict();

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.email().optional(),
    password: passwordSchema.optional(),
    profile: z.string().optional(),
    status: z.enum(["active", "blocked"]).optional(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one editable field is required.",
  });
