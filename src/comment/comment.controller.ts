import { Context } from "hono";
import { commentService, getcommentService, createcommentService, updatecommentService, deletecommentService } from "./comment.service";

export const listcomment = async (c: Context) => {
    try {
        //limit the number of comments to be returned

        const limit = Number(c.req.query('limit'))

        const data = await commentService(limit);
        if (data == null || data.length == 0) {
            return c.text("comment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getcomment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await getcommentService(id);
    if (comment == undefined) {
        return c.text("comment not found", 404);
    }
    return c.json(comment, 200);
}
export const createcomment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdcomment = await createcommentService(comment);


        if (!createdcomment) return c.text("comment not created", 404);
        return c.json({ msg: createdcomment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatecomment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await c.req.json();
    try {
        // search for the comment
        const searchedcomment = await getcommentService(id);
        if (searchedcomment == undefined) return c.text("comment not found", 404);
        // get the data and update it
        const res = await updatecommentService(id, comment);
        // return a success message
        if (!res) return c.text("comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletecomment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the comment
        const comment = await getcommentService(id);
        if (comment == undefined) return c.text("comment not found", 404);
        //deleting the comment
        const res = await deletecommentService(id);
        if (!res) return c.text("comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}