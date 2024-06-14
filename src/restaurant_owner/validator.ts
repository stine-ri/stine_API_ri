import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const restaurant_ownerSchema = z.object({
    
   resturant_id:z.number(),
   owner_id:z.number(),
  
  
})

