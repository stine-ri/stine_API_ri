import { Context } from "hono";
import { order_statusService, getorder_statusService, createorder_statusService, updateorder_statusService, deleteorder_statusService } from "./order_status.service";

export const listorder_status = async (c: Context) => {
    try {
        //limit the number of order_statuss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await order_statusService(limit);
        if (data == null || data.length == 0) {
            return c.text("order_status not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorder_status = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_status = await getorder_statusService(id);
    if (order_status == undefined) {
        return c.text("order_status not found", 404);
    }
    return c.json(order_status, 200);
}
export const createorder_status = async (c: Context) => {
    try {
        const order_status = await c.req.json();
        const createdorder_status = await createorder_statusService(order_status);


        if (!createdorder_status) return c.text("order_status not created", 404);
        return c.json({ msg: createdorder_status }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorder_status = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_status = await c.req.json();
    try {
        // search for the order_status
        const searchedorder_status = await getorder_statusService(id);
        if (searchedorder_status == undefined) return c.text("order_status not found", 404);
        // get the data and update it
        const res = await updateorder_statusService(id, order_status);
        // return a success message
        if (!res) return c.text("order_status not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorder_status = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the order_status
        const order_status = await getorder_statusService(id);
        if (order_status == undefined) return c.text("order_status not found", 404);
        //deleting the order_status
        const res = await deleteorder_statusService(id);
        if (!res) return c.text("order_status not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}