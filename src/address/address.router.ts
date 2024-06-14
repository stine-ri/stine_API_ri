
import { Hono } from "hono";
import { listaddress, getaddress, createaddress, updateaddress, deleteaddress } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "./validator";
export const addressRouter = new Hono();

//get all addresss      api/addresss
addressRouter.get("/address", listaddress);
//get a single address    api/addresss/1
addressRouter.get("/address/:id", getaddress)
// create a address 
addressRouter.post("/address", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createaddress)
//update a address
addressRouter.put("/address/:id", updateaddress) 

addressRouter.delete("/address/:id", deleteaddress)
