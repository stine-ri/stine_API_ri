
import { Hono } from "hono";
import { liststatus_catalog, getstatus_catalog, createstatus_catalog, updatestatus_catalog, deletestatus_catalog } from "./status_catalog.controller"
import { zValidator } from "@hono/zod-validator";
import { status_catalogSchema } from "./validator";
export const status_catalogRouter = new Hono();

//get all status_catalogs      api/status_catalogs
status_catalogRouter.get("/status_catalog", liststatus_catalog);
//get a single status_catalog    api/status_catalogs/1
status_catalogRouter.get("/status_catalog/:id", getstatus_catalog)
// create a status_catalog 
status_catalogRouter.post("/status_catalog", zValidator('json', status_catalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstatus_catalog)
//update a status_catalog
status_catalogRouter.put("/status_catalog/:id", updatestatus_catalog) 

status_catalogRouter.delete("/status_catalog/:id", deletestatus_catalog)
