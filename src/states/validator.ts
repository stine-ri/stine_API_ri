import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const stateSchema = z.object({
    name:z.string(),
    code:z.string(),
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