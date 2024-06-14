
import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { adminRoleAuth } from '../middleware/bearAuth'
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", adminRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id", getUser)
//get user with address
userRouter.get("/users-address", listUsers)
//get restaurant_owner with resturant
userRouter.get("/User-comments", listUsers)
// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser) 

userRouter.delete("/users/:id",adminRoleAuth, deleteUser)
