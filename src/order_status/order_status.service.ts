
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder_status, TSOrder_status, order_status as order_statusSchema } from "../drizzle/schema";

export const order_statusService = async (limit?: number): Promise<TSOrder_status[] | null> => {
    if (limit) {
        return await db.query.order_status.findMany({
            limit: limit
        });
    }
    return await db.query.order_status.findMany();
}

export const getorder_statusService = async (id: number): Promise<TIOrder_status | undefined> => {
    return await db.query.order_status.findFirst({
        where: eq(order_statusSchema.id, id)
    });
}

export const createorder_statusService = async (neworder_status: TIOrder_status) => {
    await db.insert(order_statusSchema).values(neworder_status);
    return "order_status created successfully";
}

export const updateorder_statusService = async (id: number, updatedorder_status: TIOrder_status) => {
    await db.update(order_statusSchema).set(updatedorder_status).where(eq(order_statusSchema.id, id));
    return "order_status updated successfully";
}

export const deleteorder_statusService = async (id: number) => {
    await db.delete(order_statusSchema).where(eq(order_statusSchema.id, id));
    return "order_status deleted successfully";
}
