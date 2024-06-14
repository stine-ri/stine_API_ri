
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIStatus_catalog, TSStatus_catalog, status_catalog as status_catalogSchema } from "../drizzle/schema";

export const status_catalogService = async (limit?: number): Promise<TSStatus_catalog[] | null> => {
    if (limit) {
        return await db.query.status_catalog.findMany({
            limit: limit
        });
    }
    return await db.query.status_catalog.findMany();
}

export const getstatus_catalogService = async (id: number): Promise<TIStatus_catalog | undefined> => {
    return await db.query.status_catalog.findFirst({
        where: eq(status_catalogSchema.id, id)
    });
}

export const createstatus_catalogService = async (newstatus_catalog: TIStatus_catalog) => {
    await db.insert(status_catalogSchema).values(newstatus_catalog);
    return "status_catalog created successfully";
}

export const updatestatus_catalogService = async (id: number, updatedstatus_catalog: TIStatus_catalog) => {
    await db.update(status_catalogSchema).set(updatedstatus_catalog).where(eq(status_catalogSchema.id, id));
    return "status_catalog updated successfully";
}

export const deletestatus_catalogService = async (id: number) => {
    await db.delete(status_catalogSchema).where(eq(status_catalogSchema.id, id));
    return "status_catalog deleted successfully";
}
