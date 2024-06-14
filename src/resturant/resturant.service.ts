
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant, TSRestaurant, restaurant as resturantSchema } from "../drizzle/schema";

export const resturantService = async (limit?: number): Promise<TSRestaurant[] | null> => {
    if (limit) {
        return await db.query.restaurant.findMany({
            limit: limit
        });
    }
    return await db.query.restaurant.findMany();
}

export const getresturantService = async (id: number): Promise<TIRestaurant | undefined> => {
    return await db.query.restaurant.findFirst({
        where: eq(resturantSchema.id, id)
    });
}

export const createresturantService = async (newresturant: TIRestaurant) => {
    await db.insert(resturantSchema).values(newresturant);
    return "resturant created successfully";
}

export const updateresturantService = async (id: number, updatedresturant: TIRestaurant) => {
    await db.update(resturantSchema).set(updatedresturant).where(eq(resturantSchema.id, id));
    return "resturant updated successfully";
}

export const deleteresturantService = async (id: number) => {
    await db.delete(resturantSchema).where(eq(resturantSchema.id, id));
    return "resturant deleted successfully";
}
export const getResturantOrdersService = async () => {
    return await db.query.restaurant.findMany({
      
        with:{

            orders: true
        }
    });
}