
import { Hono } from "hono";
import { listorder_menu_item , getorder_menu_item , createorder_menu_item , updateorder_menu_item , deleteorder_menu_item  } from "./order_menu_item .controller"
import { zValidator } from "@hono/zod-validator";
import { order_menu_itemSchema } from "./validator";
export const order_menu_itemRouter = new Hono();

//get all order_menu_item s      api/order_menu_item s
order_menu_itemRouter.get("/order_menu_item", listorder_menu_item);
//get a single order_menu_item     api/order_menu_item s/1
order_menu_itemRouter.get("/order_menu_item/:id", getorder_menu_item)
// create a order_menu_item  
order_menu_itemRouter.post("/order_menu_item", zValidator('json', order_menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorder_menu_item )
//update a order_menu_item 
order_menu_itemRouter.put("/order_menu_item/:id", updateorder_menu_item) 

order_menu_itemRouter.delete("/order_menu_item/:id", deleteorder_menu_item)
