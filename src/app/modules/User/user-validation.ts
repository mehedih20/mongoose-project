import { z } from "zod";

const userFullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const userOrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(15),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema).optional(),
});
