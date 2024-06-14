import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const menu_itemSchema = z.object({
    
  name: z.string(),
  resturant_id: z.number(),
  category_id: z.number(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
  active: z.boolean(),
  
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