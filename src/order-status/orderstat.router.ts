
import {listorderstat,createorderstat,updateorderstat,getorderstatid,deleteorderstat} from "./orderstat.controller"
import { zValidator } from "@hono/zod-validator";
import { orderStatusValidator } from "../validators";
import { adminRoleAuth,bothRoleAuth } from "../middleware/bearAuth";
import { Hono } from "hono";


export const orderstatRouter = new Hono();

//get all orderstat     
orderstatRouter.get("/orderstat",adminRoleAuth, listorderstat);
//get a single orderstat  
orderstatRouter.get("/orderstat/:id",bothRoleAuth,getorderstatid )
// create a orderstat 
orderstatRouter.post("/orderstat",zValidator('json',orderStatusValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createorderstat)
//update a orderstat
orderstatRouter.put("/orderstat/:id",adminRoleAuth, updateorderstat)
//remove a orderstat
orderstatRouter.delete("/orderstat/:id",adminRoleAuth, deleteorderstat)