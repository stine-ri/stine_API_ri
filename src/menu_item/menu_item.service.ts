
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMenu_item, TSMenu_item, menu_item as menu_itemSchema } from "../drizzle/schema";

export const menu_itemService = async (limit?: number): Promise<TSMenu_item[] | null> => {
    if (limit) {
        return await db.query.menu_item.findMany({
            limit: limit
        });
    }
    return await db.query.menu_item.findMany();
}

export const getmenu_itemService = async (id: number): Promise<TIMenu_item | undefined> => {
    return await db.query.menu_item.findFirst({
        where: eq(menu_itemSchema.id, id)
    });
}

export const createmenu_itemService = async (newmenu_item: TIMenu_item) => {
    await db.insert(menu_itemSchema).values(newmenu_item);
    return "menu_item created successfully";
}

export const updatemenu_itemService = async (id: number, updatedmenu_item: TIMenu_item) => {
    await db.update(menu_itemSchema).set(updatedmenu_item).where(eq(menu_itemSchema.id, id));
    return "menu_item updated successfully";
}

export const deletemenu_itemService = async (id: number) => {
    await db.delete(menu_itemSchema).where(eq(menu_itemSchema.id, id));
    return "menu_item deleted successfully";
}
