import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIStates, TSStates, city, state } from "../drizzle/schema";

export const statesService = async (limit?: number): Promise<TSStates[] | null> => {
    if (limit) {
        return await db.query.state.findMany({
            limit: limit
        });
    }
    return await db.query.state.findMany();
}

export const getstatesService = async (id: number): Promise<TIStates | undefined> => {
    return await db.query.state.findFirst({
        where: eq(state.id, id)
    })
}

export const createstatesService = async (states: TIStates) => {
    await db.insert(state).values(states)
    return "states created successfully";
}

export const updatestatesService = async (id: number, states: TIStates) => {
    await db.update(state).set(states).where(eq(state.id, id))
    return "states updated successfully";
}

export const deletestatesService = async (id: number) => {
    await db.delete(state).where(eq(state.id, id))
    return "states deleted successfully";
}


 export const getStateCityService = async () => {
        return await db.query.state.findMany({
          
            with:{

                cities: true
            }
        });
    }
