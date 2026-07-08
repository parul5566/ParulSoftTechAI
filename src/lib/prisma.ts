import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  // Parse the MySQL connection URL: mysql://user:pass@host:port/db
  const match = url.match(/^mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)$/);
  if (!match) {
    throw new Error("Invalid DATABASE_URL format");
  }

  const [, user, password, host, port, database] = match;

  const adapter = new PrismaMariaDb({
    user: decodeURIComponent(user),
    password: decodeURIComponent(password),
    host,
    port: parseInt(port, 10),
    database,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
