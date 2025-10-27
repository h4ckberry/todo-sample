// Load environment variables from .env so Prisma can read DATABASE_URL at runtime
// when running locally (Azure Functions Core Tools doesn't automatically load .env).
import "dotenv/config";

// Import the generated Prisma client directly so the runtime doesn't hit
// the @prisma/client placeholder that throws when a custom generator output
// is used. This ensures the Functions worker can initialize PrismaClient.
import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient();