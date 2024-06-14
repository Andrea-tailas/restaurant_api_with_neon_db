import { Hono } from "hono";
import { listorder, getorder, createorder, updateorder, deleteorder } from "./order.controller"
export const orderRouter = new Hono();
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth,bothRoleAuth } from "../middleware/bearAuth";
import { ordersValidator } from "../validators";

orderRouter.get("/orders",adminRoleAuth, listorder);
orderRouter.get("/order/:id",bothRoleAuth, getorder)
orderRouter.post("/order",zValidator('json',ordersValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createorder)
orderRouter.put("/order/:id",bothRoleAuth, updateorder)
orderRouter.delete("/order/:id",bothRoleAuth, deleteorder)