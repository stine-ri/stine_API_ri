import { Hono } from "hono";
import { listStates, getStates, createStates, updateStates, deleteState, getStatesWithCities } from "./states.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "./validator";
export const statesRouter = new Hono();

//get all states      api/states
statesRouter.get("/states", listStates);
//get states with cities
statesRouter.get("/states-cities", getStatesWithCities)

//get a single states    api/states/1
statesRouter.get("/states/:id", getStates)
// create a states 
statesRouter.post("/states", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStates)
//update a states
statesRouter.put("/states/:id", updateStates)

statesRouter.delete("/states/:id", deleteState)