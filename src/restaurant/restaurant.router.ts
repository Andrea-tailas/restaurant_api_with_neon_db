import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { restaurantValidator } from "../validators";
import { listrest, getrest, createrest, updaterest, deleterest } from "./restaurant.controller"
import { adminRoleAuth } from "../middleware/bearAuth";
export const restRouter = new Hono();

restRouter.get("/restaurants", listrest);
restRouter.get("/restaurant/:id", getrest)
restRouter.post("/restaurant",zValidator('json',restaurantValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createrest)
restRouter.put("/restaurant/:id", updaterest)
restRouter.delete("/restaurant/:id", deleterest)