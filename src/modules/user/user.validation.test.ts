import assert from "node:assert/strict";
import test from "node:test";
import { createUserSchema, updateUserSchema } from "./user.validation.js";

test("accepts a valid user creation payload", () => {
  const result = createUserSchema.safeParse({
    name: "Ada Lovelace",
    email: "ada@example.com",
    password: "correct-horse-battery",
  });
  assert.equal(result.success, true);
});

test("rejects missing or too-short passwords", () => {
  assert.equal(
    createUserSchema.safeParse({ name: "Ada", email: "ada@example.com" }).success,
    false
  );
  assert.equal(
    createUserSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      password: "short",
    }).success,
    false
  );
});

test("rejects invalid email addresses and unapproved fields", () => {
  assert.equal(
    createUserSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      password: "correct-horse-battery",
    }).success,
    false
  );
  assert.equal(
    createUserSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      password: "correct-horse-battery",
      isAdmin: true,
    }).success,
    false
  );
});

test("requires at least one editable field for user updates", () => {
  assert.equal(updateUserSchema.safeParse({}).success, false);
  assert.equal(updateUserSchema.safeParse({ name: "Ada Byron" }).success, true);
});
