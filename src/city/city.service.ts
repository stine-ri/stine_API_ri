
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity, TSCity, city as citySchema } from "../drizzle/schema";

export const cityService = async (limit?: number): Promise<TSCity[] | null> => {
    if (limit) {
        return await db.query.city.findMany({
            limit: limit
        });
    }
    return await db.query.city.findMany();
}

export const getcityService = async (id: number): Promise<TICity | undefined> => {
    return await db.query.city.findFirst({
        where: eq(citySchema.id, id)
    });
}

export const createcityService = async (newcity: TICity) => {
    await db.insert(citySchema).values(newcity);
    return "city created successfully";
}

export const updatecityService = async (id: number, updatedcity: TICity) => {
    await db.update(citySchema).set(updatedcity).where(eq(citySchema.id, id));
    return "city updated successfully";
}

export const deletecityService = async (id: number) => {
    await db.delete(citySchema).where(eq(citySchema.id, id));
    return "city deleted successfully";
}
