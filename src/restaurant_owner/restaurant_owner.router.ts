
import { Hono } from "hono";
import { listrestaurant_owner, getrestaurant_owner, createrestaurant_owner, updaterestaurant_owner, deleterestaurant_owner } from "./restaurant_owner.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurant_ownerSchema } from "./validator";
export const restaurant_ownerRouter = new Hono();

//get all restaurant_owners      api/restaurant_owners
restaurant_ownerRouter.get("/restaurant_owner", listrestaurant_owner);
//get restaurant_owner with resturant
restaurant_ownerRouter.get("/resturant_owner-resturant", listrestaurant_owner)
//get restaurant_owner with resturant
restaurant_ownerRouter.get("/getRestaurant_owner-User", listrestaurant_owner)
//get a single restaurant_owner    api/restaurant_owners/1
restaurant_ownerRouter.get("/restaurant_owner/:id", getrestaurant_owner)
// create a restaurant_owner 
restaurant_ownerRouter.post("/restaurant_owner", zValidator('json', restaurant_ownerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createrestaurant_owner)
//update a restaurant_owner
restaurant_ownerRouter.put("/restaurant_owner/:id", updaterestaurant_owner) 

restaurant_ownerRouter.delete("/restaurant_owner/:id", deleterestaurant_owner)
