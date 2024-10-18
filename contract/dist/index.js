import { initContract } from "@ts-rest/core";
import { CreateAdminBodySchema, CreateAdminResponseSchema } from "./validations/auth.js";
const c = initContract();
const adminContract = c.router({ createAdmin: {
        path: "/add",
        method: "POST",
        body: CreateAdminBodySchema,
        responses: {
            201: CreateAdminResponseSchema,
        },
    },
}, { pathPrefix: "/admin" });
const contract = c.router({
    auth: adminContract,
});
export default contract;
