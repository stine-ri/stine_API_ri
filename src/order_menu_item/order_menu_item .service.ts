
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder_menu_item , TSOrder_menu_item , order_menu_item  as order_menu_itemSchema } from "../drizzle/schema";

export const order_menu_itemService = async (limit?: number): Promise<TSOrder_menu_item [] | null> => {
    if (limit) {
        return await db.query.order_menu_item .findMany({
            limit: limit
        });
    }
    return await db.query.order_menu_item .findMany();
}

export const getorder_menu_itemService = async (id: number): Promise<TIOrder_menu_item  | undefined> => {
    return await db.query.order_menu_item .findFirst({
        where: eq(order_menu_itemSchema.id, id)
    });
}

export const createorder_menu_itemService = async (neworder_menu_item : TIOrder_menu_item ) => {
    await db.insert(order_menu_itemSchema).values(neworder_menu_item );
    return "order_menu_item  created successfully";
}

export const updateorder_menu_itemService = async (id: number, updatedorder_menu_item : TIOrder_menu_item ) => {
    await db.update(order_menu_itemSchema).set(updatedorder_menu_item ).where(eq(order_menu_itemSchema.id, id));
    return "order_menu_item  updated successfully";
}

export const deleteorder_menu_itemService = async (id: number) => {
    await db.delete(order_menu_itemSchema).where(eq(order_menu_itemSchema.id, id));
    return "order_menu_item  deleted successfully";
}
