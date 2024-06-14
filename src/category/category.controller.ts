import { Context } from "hono";
import { categoryService, getcategoryService, createcategoryService, updatecategoryService, deletecategoryService } from "./category.service";

export const listcategory = async (c: Context) => {
    try {
        //limit the number of categorys to be returned

        const limit = Number(c.req.query('limit'))

        const data = await categoryService(limit);
        if (data == null || data.length == 0) {
            return c.text("category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getcategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category = await getcategoryService(id);
    if (category == undefined) {
        return c.text("category not found", 404);
    }
    return c.json(category, 200);
}
export const createcategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const createdcategory = await createcategoryService(category);


        if (!createdcategory) return c.text("category not created", 404);
        return c.json({ msg: createdcategory }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatecategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category = await c.req.json();
    try {
        // search for the category
        const searchedcategory = await getcategoryService(id);
        if (searchedcategory == undefined) return c.text("category not found", 404);
        // get the data and update it
        const res = await updatecategoryService(id, category);
        // return a success message
        if (!res) return c.text("category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletecategory = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the category
        const category = await getcategoryService(id);
        if (category == undefined) return c.text("category not found", 404);
        //deleting the category
        const res = await deletecategoryService(id);
        if (!res) return c.text("category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}