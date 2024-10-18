import { z } from "zod";
export declare const UserAuthBodySchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    userType: z.ZodDefault<z.ZodEnum<["SuperAdmin", "Admin"]>>;
    prisonId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    userType: "SuperAdmin" | "Admin";
    prisonId?: number | undefined;
}, {
    username: string;
    password: string;
    userType?: "SuperAdmin" | "Admin" | undefined;
    prisonId?: number | undefined;
}>, {
    username: string;
    password: string;
    userType: "SuperAdmin" | "Admin";
    prisonId?: number | undefined;
}, {
    username: string;
    password: string;
    userType?: "SuperAdmin" | "Admin" | undefined;
    prisonId?: number | undefined;
}>, {
    username: string;
    password: string;
    userType: "SuperAdmin" | "Admin";
    prisonId?: number | undefined;
}, {
    username: string;
    password: string;
    userType?: "SuperAdmin" | "Admin" | undefined;
    prisonId?: number | undefined;
}>;
export declare const AdminLoginResponse: z.ZodObject<{
    accessToken: z.ZodString;
    payload: z.ZodObject<{
        userId: z.ZodNumber;
        userName: z.ZodString;
        adminId: z.ZodNumber;
        role: z.ZodEnum<["Admin", "SuperAdmin"]>;
    }, "strip", z.ZodTypeAny, {
        role: "SuperAdmin" | "Admin";
        userId: number;
        userName: string;
        adminId: number;
    }, {
        role: "SuperAdmin" | "Admin";
        userId: number;
        userName: string;
        adminId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
    payload: {
        role: "SuperAdmin" | "Admin";
        userId: number;
        userName: string;
        adminId: number;
    };
}, {
    accessToken: string;
    payload: {
        role: "SuperAdmin" | "Admin";
        userId: number;
        userName: string;
        adminId: number;
    };
}>;
