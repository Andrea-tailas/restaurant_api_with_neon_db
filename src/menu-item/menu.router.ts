import { Hono } from "hono";
import { listmenu,getmenu,createmenu,updatemenu,deletemenu } from "./menu.controller";
import { zValidator } from "@hono/zod-validator";
import { menuItemValidator } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const menuRouter = new Hono();

menuRouter.get("/menuitems",adminRoleAuth, listmenu)
menuRouter.get("/menuitem/:id", getmenu)
menuRouter.post("/menuitem",zValidator('json',menuItemValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createmenu)
menuRouter.put("/menuitem/:id", updatemenu)
menuRouter.delete("/menuitem/:id", deletemenu)