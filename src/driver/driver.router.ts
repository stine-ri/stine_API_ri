
import { Hono } from "hono";
import { listdriver, getdriver, createdriver, updatedriver, deletedriver } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "./validator";
export const driverRouter = new Hono();

//get all drivers      api/drivers
driverRouter.get("/driver", listdriver);
//get a single driver    api/drivers/1
driverRouter.get("/driver/:id", getdriver)
// create a driver 
driverRouter.post("/driver", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createdriver)
//update a driver
driverRouter.put("/driver/:id", updatedriver) 

driverRouter.delete("/driver/:id", deletedriver)
