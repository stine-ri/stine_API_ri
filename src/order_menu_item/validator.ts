import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'
import { comment } from '../drizzle/schema'


export const order_menu_itemSchema = z.object({
    
  order_id: z.number(),
  menu_item_id:z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string(),
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