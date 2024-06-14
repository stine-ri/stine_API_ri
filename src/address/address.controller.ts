import { Context } from "hono";
import { addressService, getAddressService, createAddressService, updateAddressService, deleteAddressService } from "./address.service";

export const listaddress = async (c: Context) => {
    try {
        //limit the number of addresss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await addressService(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getaddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await getAddressService(id);
    if (address == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(address, 200);
}
export const createaddress = async (c: Context) => {
    try {
        const address = await c.req.json();
        const createdaddress = await createAddressService(address);


        if (!createdaddress) return c.text("address not created", 404);
        return c.json({ msg: createdaddress }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateaddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await c.req.json();
    try {
        // search for the address
        const searchedaddress = await getAddressService(id);
        if (searchedaddress == undefined) return c.text("address not found", 404);
        // get the data and update it
        const res = await updateAddressService(id, address);
        // return a success message
        if (!res) return c.text("address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteaddress = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the address
        const address = await getAddressService(id);
        if (address == undefined) return c.text("address not found", 404);
        //deleting the address
        const res = await deleteAddressService(id);
        if (!res) return c.text("address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}