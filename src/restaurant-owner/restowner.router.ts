import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {restaurantOwnerValidator } from "../validators";
import { listrestowner, getrestowner, createrestowner, updaterestowner, deleterestowner } from "./restowner.controller"
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";
export const restownerRouter = new Hono();

restownerRouter.get("/restaurantowners",adminRoleAuth, listrestowner);
restownerRouter.get("/restaurantowner/:id",bothRoleAuth, getrestowner)
restownerRouter.post("/restaurantowner",zValidator('json',restaurantOwnerValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),bothRoleAuth, createrestowner)
restownerRouter.put("/restaurantowner/:id",bothRoleAuth, updaterestowner)
restownerRouter.delete("/restaurantowner/:id",bothRoleAuth, deleterestowner)