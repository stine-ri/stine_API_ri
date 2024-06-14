import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const driverSchema = z.object({
    
  name: z.string(),
  state_id: z.number(),
  car_make: z.string(),
  car_model: z.string(),
  car_year: z.number(),
  user_id: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
  
})

