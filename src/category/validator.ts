import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const categorySchema = z.object({
    
  name: z.string(),
 
  
})

