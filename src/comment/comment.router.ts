
import { Hono } from "hono";
import { listcomment, getcomment, createcomment, updatecomment, deletecomment } from "./comment.controller"
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "./validator";
export const commentRouter = new Hono();

//get all comments      api/comments
commentRouter.get("/comment", listcomment);
//get a single comment    api/comments/1
commentRouter.get("/comment/:id", getcomment)
// create a comment 
commentRouter.post("/comment", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcomment)
//update a comment
commentRouter.put("/comment/:id", updatecomment) 

commentRouter.delete("/comment/:id", deletecomment)
