import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const ordersSchema = z.object({
  
  restaurant_id:z.number(),
  // estimated_delivery_time:z.number(),
  // actual_delivery_time:z.number(),
  delivery_address_id:z.number(),
  user_id:z.number(),
  driver_id:z.number(),
  price:z.number(),
  discount:z.number(),
  final_price:z.number(),
  comment:z.string(),

})
//columns{
//resturant_id = false to prevent them from being displayed//
// user_id:false
// driver_id:false
//}