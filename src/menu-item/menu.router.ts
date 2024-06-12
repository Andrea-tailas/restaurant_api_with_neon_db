import { Hono } from "hono";
import { listmenu,getmenu,createmenu,updatemenu,deletemenu } from "./menu.controller";
import { zValidator } from "@hono/zod-validator";
import { menuItemValidator } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const menuRouter = new Hono();

menuRouter.get("/menu-items/", listmenu)
menuRouter.get("/menu-item/:id", getmenu)
menuRouter.post("/menu-item",zValidator('json',menuItemValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createmenu)
menuRouter.put("/menu-item/:id", updatemenu)
menuRouter.delete("/menu-item/:id", deletemenu)