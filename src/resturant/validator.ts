import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const resturantSchema = z.object({
    
  name: z.string(),
  street_address: z.string(),
  zip_code: z.string(),
})

