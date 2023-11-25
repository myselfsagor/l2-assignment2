"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().max(20, 'first name max length 20'),
        lastName: zod_1.z.string().max(20, 'last name max length 20'),
    }),
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    orders: zod_1.z.optional(zod_1.z.array(zod_1.z.object({
        productName: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
    }))),
});
exports.default = userValidationSchema;
