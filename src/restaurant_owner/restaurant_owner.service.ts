
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant_owner, TSRestaurant_owner, restaurant_owner as restaurant_ownerSchema } from "../drizzle/schema";

export const restaurant_ownerService = async (limit?: number): Promise<TSRestaurant_owner[] | null> => {
    if (limit) {
        return await db.query.restaurant_owner.findMany({
            limit: limit
        });
    }
    return await db.query.restaurant_owner.findMany();
}

export const getrestaurant_ownerService = async (id: number): Promise<TIRestaurant_owner | undefined> => {
    return await db.query.restaurant_owner.findFirst({
        where: eq(restaurant_ownerSchema.id, id)
    });
}

export const createrestaurant_ownerService = async (newrestaurant_owner: TIRestaurant_owner) => {
    await db.insert(restaurant_ownerSchema).values(newrestaurant_owner);
    return "restaurant_owner created successfully";
}

export const updaterestaurant_ownerService = async (id: number, updatedrestaurant_owner: TIRestaurant_owner) => {
    await db.update(restaurant_ownerSchema).set(updatedrestaurant_owner).where(eq(restaurant_ownerSchema.id, id));
    return "restaurant_owner updated successfully";
}

export const deleterestaurant_ownerService = async (id: number) => {
    await db.delete(restaurant_ownerSchema).where(eq(restaurant_ownerSchema.id, id));
    return "restaurant_owner deleted successfully";
}
