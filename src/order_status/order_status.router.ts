
import { Hono } from "hono";
import { listorder_status, getorder_status, createorder_status, updateorder_status, deleteorder_status } from "./order-status.controller"
import { zValidator } from "@hono/zod-validator";
import { order_statusSchema } from "./validator";
export const order_statusRouter = new Hono();

//get all order_statuss      api/order_statuss
order_statusRouter.get("/order_status", listorder_status);
//get a single order_status    api/order_statuss/1
order_statusRouter.get("/order_status/:id", getorder_status)
// create a order_status 
order_statusRouter.post("/order_status", zValidator('json', order_statusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorder_status)
//update a order_status
order_statusRouter.put("/order_status/:id", updateorder_status) 

order_statusRouter.delete("/order_status/:id", deleteorder_status)
