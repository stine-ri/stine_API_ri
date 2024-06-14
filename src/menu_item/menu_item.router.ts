
import { Hono } from "hono";
import { listmenu_item, getmenu_item, createmenu_item, updatemenu_item, deletemenu_item } from "./menu_item.controller"
import { zValidator } from "@hono/zod-validator";
import { menu_itemSchema } from "./validator";
export const menu_itemRouter = new Hono();

//get all menu_items      api/menu_items
menu_itemRouter.get("/menu_item", listmenu_item);
//get a single menu_item    api/menu_items/1
menu_itemRouter.get("/menu_item/:id", getmenu_item)
// create a menu_item 
menu_itemRouter.post("/menu_item", zValidator('json', menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createmenu_item)
//update a menu_item
menu_itemRouter.put("/menu_item/:id", updatemenu_item) 

menu_itemRouter.delete("/menu_item/:id", deletemenu_item)
