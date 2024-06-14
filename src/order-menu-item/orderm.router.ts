import { Hono } from "hono";
import { listordermenu, getorder, createorder, updateorder, deleteorder } from "./orderm.controller"
export const ordermenuRouter = new Hono();
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";


ordermenuRouter.get("/ordermenuitems",adminRoleAuth, listordermenu);
ordermenuRouter.get("/ordermenuitem/:id",bothRoleAuth, getorder)
ordermenuRouter.post("/ordermenuitem",zValidator('json',orderMenuItemValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createorder)
ordermenuRouter.put("/ordermenuitem/:id",adminRoleAuth, updateorder)
ordermenuRouter.delete("/ordermenuitem/:id",adminRoleAuth, deleteorder)