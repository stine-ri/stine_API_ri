import { Context } from "hono";
import { restaurant_ownerService, getrestaurant_ownerService, createrestaurant_ownerService, updaterestaurant_ownerService, deleterestaurant_ownerService } from "./restaurant_owner.service";

export const listrestaurant_owner = async (c: Context) => {
    try {
        //limit the number of restaurant_owners to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurant_ownerService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant_owner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrestaurant_owner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant_owner = await getrestaurant_ownerService(id);
    if (restaurant_owner == undefined) {
        return c.text("restaurant_owner not found", 404);
    }
    return c.json(restaurant_owner, 200);
}
export const createrestaurant_owner = async (c: Context) => {
    try {
        const restaurant_owner = await c.req.json();
        const createdrestaurant_owner = await createrestaurant_ownerService(restaurant_owner);


        if (!createdrestaurant_owner) return c.text("restaurant_owner not created", 404);
        return c.json({ msg: createdrestaurant_owner }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterestaurant_owner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant_owner = await c.req.json();
    try {
        // search for the restaurant_owner
        const searchedrestaurant_owner = await getrestaurant_ownerService(id);
        if (searchedrestaurant_owner == undefined) return c.text("restaurant_owner not found", 404);
        // get the data and update it
        const res = await updaterestaurant_ownerService(id, restaurant_owner);
        // return a success message
        if (!res) return c.text("restaurant_owner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterestaurant_owner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the restaurant_owner
        const restaurant_owner = await getrestaurant_ownerService(id);
        if (restaurant_owner == undefined) return c.text("restaurant_owner not found", 404);
        //deleting the restaurant_owner
        const res = await deleterestaurant_ownerService(id);
        if (!res) return c.text("restaurant_owner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// get restaurant_owner with resturant
export const getRestaurant_ownerWithResturant = async (c: Context) =>{
    try{
       const data = await restaurant_ownerService();
       if (data==null || data.length==0){
           return c.text("State not found", 404)
       } 
       return c.json(data, 200);
    }catch(error:any){
       return c.json({error: error?.message}, 400)
    }
}
// get restaurant_owner with resturant
export const getRestaurant_ownerWithUser = async (c: Context) =>{
    try{
       const data = await restaurant_ownerService();
       if (data==null || data.length==0){
           return c.text("State not found", 404)
       } 
       return c.json(data, 200);
    }catch(error:any){
       return c.json({error: error?.message}, 400)
    }
}