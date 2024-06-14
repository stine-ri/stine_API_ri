
import { Hono } from "hono";
import { listorders, getorders, createorders, updateorders, deleteorders } from "./orders.controller"
import { zValidator } from "@hono/zod-validator";
import { ordersSchema } from "./validator";
export const ordersRouter = new Hono();

//get all orderss      api/orderss
ordersRouter.get("/orders", listorders);
//get a single orders    api/orderss/1
ordersRouter.get("/orders/:id", getorders)
// create a orders 
ordersRouter.post("/orders", zValidator('json', ordersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorders)
//update a orders
ordersRouter.put("/orders/:id", updateorders) 

ordersRouter.delete("/orders/:id", deleteorders)
