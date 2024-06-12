import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
import {usersValidator} from "../validators"
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth,userRoleAuth,useradminRoleAuth } from "../middleware/bearAuth";
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users" ,adminRoleAuth,listUsers);
//get a single user    api/users/1
userRouter.get("/user/:id",useradminRoleAuth, getUser)
// create a user 
userRouter.post("/user",adminRoleAuth,zValidator('json',usersValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createUser)
//update a user
userRouter.put("/user/:id",useradminRoleAuth, updateUser)

userRouter.delete("/user/:id",adminRoleAuth, deleteUser)