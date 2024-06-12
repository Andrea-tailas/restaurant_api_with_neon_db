import { Hono } from "hono";
import { listordermenu, getorder, createorder, updateorder, deleteorder } from "./orderm.controller"
export const ordermenuRouter = new Hono();
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemValidator } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";


ordermenuRouter.get("/ordermenuitems", listordermenu);
ordermenuRouter.get("/ordermenuitem/:id", getorder)
ordermenuRouter.post("/ordermenuitem",zValidator('json',orderMenuItemValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createorder)
ordermenuRouter.put("/ordermenuitem/:id", updateorder)
ordermenuRouter.delete("/ordermenuitem/:id", deleteorder)