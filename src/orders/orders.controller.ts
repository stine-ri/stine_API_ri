import { Context } from "hono";
import { ordersService, getordersService, createordersService, updateordersService, deleteordersService } from "./orders.service";

export const listorders = async (c: Context) => {
    try {
        //limit the number of orderss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await ordersService(limit);
        if (data == null || data.length == 0) {
            return c.text("orders not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orders = await getordersService(id);
    if (orders == undefined) {
        return c.text("orders not found", 404);
    }
    return c.json(orders, 200);
}
export const createorders = async (c: Context) => {
    try {
        const orders = await c.req.json();
        const createdorders = await createordersService(orders);


        if (!createdorders) return c.text("orders not created", 404);
        return c.json({ msg: createdorders }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orders = await c.req.json();
    try {
        // search for the orders
        const searchedorders = await getordersService(id);
        if (searchedorders == undefined) return c.text("orders not found", 404);
        // get the data and update it
        const res = await updateordersService(id, orders);
        // return a success message
        if (!res) return c.text("orders not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorders = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the orders
        const orders = await getordersService(id);
        if (orders == undefined) return c.text("orders not found", 404);
        //deleting the orders
        const res = await deleteordersService(id);
        if (!res) return c.text("orders not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}