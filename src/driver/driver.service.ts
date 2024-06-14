
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, driver as driverSchema } from "../drizzle/schema";

export const driverService = async (limit?: number): Promise<TSDriver[] | null> => {
    if (limit) {
        return await db.query.driver.findMany({
            limit: limit
        });
    }
    return await db.query.driver.findMany();
}

export const getdriverService = async (id: number): Promise<TIDriver | undefined> => {
    return await db.query.driver.findFirst({
        where: eq(driverSchema.id, id)
    });
}

export const createdriverService = async (newdriver: TIDriver) => {
    await db.insert(driverSchema).values(newdriver);
    return "driver created successfully";
}

export const updatedriverService = async (id: number, updateddriver: TIDriver) => {
    await db.update(driverSchema).set(updateddriver).where(eq(driverSchema.id, id));
    return "driver updated successfully";
}

export const deletedriverService = async (id: number) => {
    await db.delete(driverSchema).where(eq(driverSchema.id, id));
    return "driver deleted successfully";
}
