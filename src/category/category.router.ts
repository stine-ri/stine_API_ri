
import { Hono } from "hono";
import { listcategory, getcategory, createcategory, updatecategory, deletecategory } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "./validator";
export const categoryRouter = new Hono();

//get all categorys      api/categorys
categoryRouter.get("/category", listcategory);
//get a single category    api/categorys/1
categoryRouter.get("/category/:id", getcategory)
// create a category 
categoryRouter.post("/category", zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcategory)
//update a category
categoryRouter.put("/category/:id", updatecategory) 

categoryRouter.delete("/category/:id", deletecategory)
