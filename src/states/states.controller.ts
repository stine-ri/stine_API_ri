import { Context } from "hono";
import { statesService, getstatesService, createstatesService, updatestatesService, deletestatesService,getStateCityService } from "./states.service";
import { state } from "../drizzle/schema";
import { undefined } from "zod";

// Define the type for the state object
type StateType = {
  id?: number;
  name: string;
  code: string;
};

// Other service functions (getstatesService, createstatesService, updatestatesService, deletestatesService) remain unchanged
export const createStates = async (c: Context) => {
  try {
    const state = await c.req.json<StateType>();
    const createdState = await createstatesService(state);

    if (!createdState) return c.text("State not created", 404);
    return c.json({ msg: createdState }, 201);

  } catch (error: any) {
    return c.json({ error: error?.message }, 400)
  }
}

export const listStates = async (c: Context) => {
    try {
        //limit the number of states to be returned

        const limit = Number(c.req.query('limit'))

        const data = await statesService(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getStates = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const states = await getstatesService(id);
    if (states == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(states, 200);
}

export const updateStates = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
        // search for the state
        const searchedstate = await getstatesService(id);
        if (searchedstate == undefined) return c.text("State not found", 404);
        // get the data and update it
        const res = await updatestatesService(id, state);
        // return a success message
        if (!res) return c.text("State not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the state
        const states = await getstatesService(id);
        if (states == undefined) return c.text("State not found", 404);
        //deleting the user
        const res = await deletestatesService(id);
        if (!res) return c.text("State not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
// get states with cities

export const getStatesWithCities = async (c: Context) => {
    try {
        const StateWithcities = await getStateCityService();
        if (StateWithcities === null) { // Use strict equality (===) to check for undefined
            return c.text("States and Cities not found", 404);
        }
        return c.json(StateWithcities, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

    

