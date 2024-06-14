import { Context } from "hono";
import { menu_itemService, getmenu_itemService, createmenu_itemService, updatemenu_itemService, deletemenu_itemService } from "./menu_item.service";

export const listmenu_item = async (c: Context) => {
    try {
        //limit the number of menu_items to be returned

        const limit = Number(c.req.query('limit'))

        const data = await menu_itemService(limit);
        if (data == null || data.length == 0) {
            return c.text("menu_item not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getmenu_item = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu_item = await getmenu_itemService(id);
    if (menu_item == undefined) {
        return c.text("menu_item not found", 404);
    }
    return c.json(menu_item, 200);
}
export const createmenu_item = async (c: Context) => {
    try {
        const menu_item = await c.req.json();
        const createdmenu_item = await createmenu_itemService(menu_item);


        if (!createdmenu_item) return c.text("menu_item not created", 404);
        return c.json({ msg: createdmenu_item }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatemenu_item = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu_item = await c.req.json();
    try {
        // search for the menu_item
        const searchedmenu_item = await getmenu_itemService(id);
        if (searchedmenu_item == undefined) return c.text("menu_item not found", 404);
        // get the data and update it
        const res = await updatemenu_itemService(id, menu_item);
        // return a success message
        if (!res) return c.text("menu_item not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletemenu_item = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the menu_item
        const menu_item = await getmenu_itemService(id);
        if (menu_item == undefined) return c.text("menu_item not found", 404);
        //deleting the menu_item
        const res = await deletemenu_itemService(id);
        if (!res) return c.text("menu_item not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}