
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIComment, TSComment, comment as commentSchema } from "../drizzle/schema";

export const commentService = async (limit?: number): Promise<TSComment[] | null> => {
    if (limit) {
        return await db.query.comment.findMany({
            limit: limit
        });
    }
    return await db.query.comment.findMany();
}

export const getcommentService = async (id: number): Promise<TIComment | undefined> => {
    return await db.query.comment.findFirst({
        where: eq(commentSchema.id, id)
    });
}

export const createcommentService = async (newcomment: TIComment) => {
    await db.insert(commentSchema).values(newcomment);
    return "comment created successfully";
}

export const updatecommentService = async (id: number, updatedcomment: TIComment) => {
    await db.update(commentSchema).set(updatedcomment).where(eq(commentSchema.id, id));
    return "comment updated successfully";
}

export const deletecommentService = async (id: number) => {
    await db.delete(commentSchema).where(eq(commentSchema.id, id));
    return "comment deleted successfully";
}
