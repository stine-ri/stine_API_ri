import { Context } from "hono";
import { driverService, getdriverService, createdriverService, updatedriverService, deletedriverService } from "./driver.service";

export const listdriver = async (c: Context) => {
    try {
        //limit the number of drivers to be returned

        const limit = Number(c.req.query('limit'))

        const data = await driverService(limit);
        if (data == null || data.length == 0) {
            return c.text("driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getdriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getdriverService(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}
export const createdriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createddriver = await createdriverService(driver);


        if (!createddriver) return c.text("driver not created", 404);
        return c.json({ msg: createddriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatedriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await c.req.json();
    try {
        // search for the driver
        const searcheddriver = await getdriverService(id);
        if (searcheddriver == undefined) return c.text("driver not found", 404);
        // get the data and update it
        const res = await updatedriverService(id, driver);
        // return a success message
        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletedriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the driver
        const driver = await getdriverService(id);
        if (driver == undefined) return c.text("driver not found", 404);
        //deleting the driver
        const res = await deletedriverService(id);
        if (!res) return c.text("driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}