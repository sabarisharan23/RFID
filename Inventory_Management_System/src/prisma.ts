import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient({
    log: ["error", "warn"],
    transactionOptions: {
        timeout: 60_000,
        maxWait: 60_000,
    },
});

export type TransactionPrismaType = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export default prisma;