import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(projectRoot, "src/generated/prisma");
const destination = resolve(projectRoot, "dist/generated/prisma");

mkdirSync(dirname(destination), { recursive: true });
cpSync(source, destination, { recursive: true, force: true });
console.log("Copied generated Prisma client to dist/generated/prisma.");
