import z from "zod";
declare const contract: {
    auth: {
        createAdmin: {
            body: z.ZodObject<{
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
            method: "POST";
            path: "/admin/add";
            responses: {
                201: z.ZodObject<{
                    userId: z.ZodNumber;
                    adminId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    userId: number;
                    adminId: number;
                }, {
                    userId: number;
                    adminId: number;
                }>;
            };
        };
    };
};
export default contract;
