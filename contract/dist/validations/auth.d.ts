import { z } from "zod";
export declare const CreateAdminBodySchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    isSuperAdmin: z.ZodBoolean;
    password: z.ZodString;
    prisonId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    username: string;
    isSuperAdmin: boolean;
    password: string;
    prisonId: number;
}, {
    name: string;
    username: string;
    isSuperAdmin: boolean;
    password: string;
    prisonId: number;
}>;
export declare const CreateAdminResponseSchema: z.ZodObject<{
    userId: z.ZodNumber;
    adminId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: number;
    adminId: number;
}, {
    userId: number;
    adminId: number;
}>;
