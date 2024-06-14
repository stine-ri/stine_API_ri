import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const userSchema = z.object({
  name: z.string(),
  contact_phone: z.string(),
  phone_verified:z. boolean(),
  email: z.string(),
  email_verified:z.boolean(),
  confirmation_code:z.string(),
  password: z.string(),
//   created_at: z.string(),
//  updated_at: z.string(),
})

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const registerUserSchema = z.object({
   userId: z.number(),
  username: z.string(),
  password: z.string(),
  // role: z.string().optional(),
  role: z.enum(["admin", "user",])
})