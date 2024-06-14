import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const order_statusSchema = z.object({
    
  order_id:z.number(),
  status_catalog_id: z.number(),
})

