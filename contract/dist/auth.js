import { z } from "zod";
export const UserAuthBodySchema = z
    .object({
    username: z.string(),
    password: z.string().min(6),
    userType: z.enum(["SuperAdmin", "Admin"]).default("Admin"),
    prisonId: z.number().positive().optional(),
})
    .refine((d) => {
    if (d.userType === "Admin")
        return d.prisonId !== undefined;
    return true;
}, { message: "Prison ID is required for admin" })
    .transform((d) => {
    if (d.userType === "SuperAdmin")
        delete d.prisonId;
    return d;
});
export const AdminLoginResponse = z.object({
    accessToken: z.string(),
    payload: z.object({
        userId: z.number(),
        userName: z.string(),
        adminId: z.number(),
        role: z.enum(["Admin", "SuperAdmin"]),
    }),
});
