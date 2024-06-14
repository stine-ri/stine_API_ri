import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const citySchema = z.object({
    
  name: z.string(),
  state_id: z.number(),
  
})

