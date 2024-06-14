
import { Hono } from "hono";
import { listresturant, getresturant, createresturant, updateresturant, deleteresturant } from "./resturant.controller"
import { zValidator } from "@hono/zod-validator";
import { resturantSchema } from "./validator";
export const resturantRouter = new Hono();

//get all resturants      api/resturants
resturantRouter.get("/resturant",);
//get resturant with orders
resturantRouter.get("/resturant-orders", listresturant)

//get a single resturant    api/resturants/1
resturantRouter.get("/resturant/:id", getresturant)
// create a resturant 
resturantRouter.post("/resturant", zValidator('json', resturantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createresturant)
//update a resturant
resturantRouter.put("/resturant/:id", updateresturant) 

resturantRouter.delete("/resturant/:id", deleteresturant)
