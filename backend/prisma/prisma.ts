import "dotenv/config";
import { PrismaClient } from "./generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env["POSTGRES_USER"],
  password: process.env["POSTGRES_PASSWORD"],
  host: process.env["POSTGRES_HOST"],
  port: Number(process.env["POSTGRES_PORT"]) ?? 5432,
  database: process.env["POSTGRES_DB"],
});
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
