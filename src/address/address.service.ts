
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAddress, TSAddress, address as addressSchema } from "../drizzle/schema";

export const addressService = async (limit?: number): Promise<TSAddress[] | null> => {
    if (limit) {
        return await db.query.address.findMany({
            limit: limit
        });
    }
    return await db.query.address.findMany();
}

export const getAddressService = async (id: number): Promise<TIAddress | undefined> => {
    return await db.query.address.findFirst({
        where: eq(addressSchema.id, id)
    });
}

export const createAddressService = async (newAddress: TIAddress) => {
    await db.insert(addressSchema).values(newAddress);
    return "Address created successfully";
}

export const updateAddressService = async (id: number, updatedAddress: TIAddress) => {
    await db.update(addressSchema).set(updatedAddress).where(eq(addressSchema.id, id));
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(addressSchema).where(eq(addressSchema.id, id));
    return "Address deleted successfully";
}
