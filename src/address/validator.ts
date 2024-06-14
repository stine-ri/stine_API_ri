import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const addressSchema = z.object({
    
  street_address_1: z.string(),
  street_address_2: z.string(),
  zip_code:z. string(),
  delivery_instructions: z.string(),
  user_id:z.number(),
   city_id:z.number(),
  // created_at:z.string(),
  // updated_at:z.string(),

})

