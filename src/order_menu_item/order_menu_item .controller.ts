import { Context } from "hono";
import { order_menu_itemService, getorder_menu_itemService, createorder_menu_itemService, updateorder_menu_itemService, deleteorder_menu_itemService } from "./order_menu_item .service";

export const listorder_menu_item  = async (c: Context) => {
    try {
        //limit the number of order_menu_item s to be returned

        const limit = Number(c.req.query('limit'))

        const data = await order_menu_itemService(limit);
        if (data == null || data.length == 0) {
            return c.text("order_menu_item  not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorder_menu_item  = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_menu_item  = await getorder_menu_itemService(id);
    if (order_menu_item  == undefined) {
        return c.text("order_menu_item  not found", 404);
    }
    return c.json(order_menu_item , 200);
}
export const createorder_menu_item  = async (c: Context) => {
    try {
        const order_menu_item  = await c.req.json();
        const createdorder_menu_item  = await createorder_menu_itemService(order_menu_item );


        if (!createdorder_menu_item ) return c.text("order_menu_item  not created", 404);
        return c.json({ msg: createdorder_menu_item  }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorder_menu_item  = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_menu_item  = await c.req.json();
    try {
        // search for the order_menu_item 
        const searchedorder_menu_item  = await getorder_menu_itemService(id);
        if (searchedorder_menu_item  == undefined) return c.text("order_menu_item  not found", 404);
        // get the data and update it
        const res = await updateorder_menu_itemService(id, order_menu_item );
        // return a success message
        if (!res) return c.text("order_menu_item  not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorder_menu_item  = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the order_menu_item 
        const order_menu_item  = await getorder_menu_itemService(id);
        if (order_menu_item  == undefined) return c.text("order_menu_item  not found", 404);
        //deleting the order_menu_item 
        const res = await deleteorder_menu_itemService(id);
        if (!res) return c.text("order_menu_item  not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}