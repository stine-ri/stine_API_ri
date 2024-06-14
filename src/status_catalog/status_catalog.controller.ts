import { Context } from "hono";
import { status_catalogService, getstatus_catalogService, createstatus_catalogService, updatestatus_catalogService, deletestatus_catalogService } from "./status_catalog.service";

export const liststatus_catalog = async (c: Context) => {
    try {
        //limit the number of status_catalogs to be returned

        const limit = Number(c.req.query('limit'))

        const data = await status_catalogService(limit);
        if (data == null || data.length == 0) {
            return c.text("status_catalog not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getstatus_catalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const status_catalog = await getstatus_catalogService(id);
    if (status_catalog == undefined) {
        return c.text("status_catalog not found", 404);
    }
    return c.json(status_catalog, 200);
}
export const createstatus_catalog = async (c: Context) => {
    try {
        const status_catalog = await c.req.json();
        const createdstatus_catalog = await createstatus_catalogService(status_catalog);


        if (!createdstatus_catalog) return c.text("status_catalog not created", 404);
        return c.json({ msg: createdstatus_catalog }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatestatus_catalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const status_catalog = await c.req.json();
    try {
        // search for the status_catalog
        const searchedstatus_catalog = await getstatus_catalogService(id);
        if (searchedstatus_catalog == undefined) return c.text("status_catalog not found", 404);
        // get the data and update it
        const res = await updatestatus_catalogService(id, status_catalog);
        // return a success message
        if (!res) return c.text("status_catalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletestatus_catalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the status_catalog
        const status_catalog = await getstatus_catalogService(id);
        if (status_catalog == undefined) return c.text("status_catalog not found", 404);
        //deleting the status_catalog
        const res = await deletestatus_catalogService(id);
        if (!res) return c.text("status_catalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}