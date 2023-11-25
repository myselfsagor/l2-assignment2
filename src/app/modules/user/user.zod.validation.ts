import { z } from 'zod';

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().max(20, 'first name max length 20'),
    lastName: z.string().max(20, 'last name max length 20'),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.optional(
    z.array(
      z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    ),
  ),
});

export default userValidationSchema;
