
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICategory, TSCategory, category as categorySchema } from "../drizzle/schema";

export const categoryService = async (limit?: number): Promise<TSCategory[] | null> => {
    if (limit) {
        return await db.query.category.findMany({
            limit: limit
        });
    }
    return await db.query.category.findMany();
}

export const getcategoryService = async (id: number): Promise<TICategory | undefined> => {
    return await db.query.category.findFirst({
        where: eq(categorySchema.id, id)
    });
}

export const createcategoryService = async (newcategory: TICategory) => {
    await db.insert(categorySchema).values(newcategory);
    return "category created successfully";
}

export const updatecategoryService = async (id: number, updatedcategory: TICategory) => {
    await db.update(categorySchema).set(updatedcategory).where(eq(categorySchema.id, id));
    return "category updated successfully";
}

export const deletecategoryService = async (id: number) => {
    await db.delete(categorySchema).where(eq(categorySchema.id, id));
    return "category deleted successfully";
}
