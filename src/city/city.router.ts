
import { Hono } from "hono";
import { listcity, getcity, createcity, updatecity, deletecity } from "./city.controller"
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "./validator";
export const cityRouter = new Hono();

//get all citys      api/citys
cityRouter.get("/city", listcity);
//get a single city    api/citys/1
cityRouter.get("/city/:id", getcity)
// create a city 
cityRouter.post("/city", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcity)
//update a city
cityRouter.put("/city/:id", updatecity) 

cityRouter.delete("/city/:id", deletecity)
