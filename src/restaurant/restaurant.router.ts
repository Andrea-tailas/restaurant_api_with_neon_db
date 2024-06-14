import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { restaurantValidator } from "../validators";
import { listrest, getrest, createrest, updaterest, deleterest } from "./restaurant.controller"
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";
export const restRouter = new Hono();

restRouter.get("/restaurants",adminRoleAuth, listrest);
restRouter.get("/restaurant/:id",bothRoleAuth, getrest)
restRouter.post("/restaurant",zValidator('json',restaurantValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createrest)
restRouter.put("/restaurant/:id",bothRoleAuth, updaterest)
restRouter.delete("/restaurant/:id",bothRoleAuth, deleterest)