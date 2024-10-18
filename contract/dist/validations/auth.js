import { z } from "zod";
export const CreateAdminBodySchema = z.object({
    name: z.string(),
    username: z.string(),
    isSuperAdmin: z.boolean(),
    password: z.string(),
    prisonId: z.number(),
});
export const CreateAdminResponseSchema = z.object({
    userId: z.number(),
    adminId: z.number(),
});
