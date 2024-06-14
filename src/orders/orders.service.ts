
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrders, TSOrders, orders as ordersSchema } from "../drizzle/schema";

export const ordersService = async (limit?: number): Promise<TSOrders[] | null> => {
    if (limit) {
        return await db.query.orders.findMany({
            limit: limit
        });
    }
    return await db.query.orders.findMany();
}

export const getordersService = async (id: number): Promise<TIOrders | undefined> => {
    return await db.query.orders.findFirst({
        where: eq(ordersSchema.id, id)
    });
}

export const createordersService = async (neworders: TIOrders) => {
    await db.insert(ordersSchema).values(neworders);
    return "orders created successfully";
}

export const updateordersService = async (id: number, updatedorders: TIOrders) => {
    await db.update(ordersSchema).set(updatedorders).where(eq(ordersSchema.id, id));
    return "orders updated successfully";
}

export const deleteordersService = async (id: number) => {
    await db.delete(ordersSchema).where(eq(ordersSchema.id, id));
    return "orders deleted successfully";
}
