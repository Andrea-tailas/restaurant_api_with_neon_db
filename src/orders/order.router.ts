import { Hono } from "hono";
import { listorder, getorder, createorder, updateorder, deleteorder } from "./order.controller"
export const orderRouter = new Hono();
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth } from "../middleware/bearAuth";
import { ordersValidator } from "../validators";

orderRouter.get("/orders", listorder);
orderRouter.get("/order/:id", getorder)
orderRouter.post("/order",zValidator('json',ordersValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}), createorder)
orderRouter.put("/order/:id", updateorder)
orderRouter.delete("/order/:id", deleteorder)