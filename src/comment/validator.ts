import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const commentSchema = z.object({
    
   order_id: z.number(),
   user_id: z.number(),
  comment_text: z.string(),
  is_complaint: z.boolean(),
  is_praise: z.boolean(),
})

