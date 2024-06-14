import { Context } from "hono";
import { resturantService, getresturantService, createresturantService, updateresturantService, deleteresturantService } from "./resturant.service";

export const listresturant = async (c: Context) => {
    try {
        //limit the number of resturants to be returned

        const limit = Number(c.req.query('limit'))

        const data = await resturantService(limit);
        if (data == null || data.length == 0) {
            return c.text("resturant not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getresturant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resturant = await getresturantService(id);
    if (resturant == undefined) {
        return c.text("resturant not found", 404);
    }
    return c.json(resturant, 200);
}
export const createresturant = async (c: Context) => {
    try {
        const resturant = await c.req.json();
        const createdresturant = await createresturantService(resturant);


        if (!createdresturant) return c.text("resturant not created", 404);
        return c.json({ msg: createdresturant }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateresturant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resturant = await c.req.json();
    try {
        // search for the resturant
        const searchedresturant = await getresturantService(id);
        if (searchedresturant == undefined) return c.text("resturant not found", 404);
        // get the data and update it
        const res = await updateresturantService(id, resturant);
        // return a success message
        if (!res) return c.text("resturant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteresturant = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the resturant
        const resturant = await getresturantService(id);
        if (resturant == undefined) return c.text("resturant not found", 404);
        //deleting the resturant
        const res = await deleteresturantService(id);
        if (!res) return c.text("resturant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
