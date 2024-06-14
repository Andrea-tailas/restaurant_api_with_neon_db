import {alladdresses,createaddress,getaddressByid,updateaddress,deleteaddress} from "./address.controller"
import { Hono } from "hono";
import { addressValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth,bothRoleAuth } from "../middleware/bearAuth";

export const addRouter = new Hono();

      
addRouter.get("/addresses", adminRoleAuth,alladdresses);    
addRouter.get("/address/:id",bothRoleAuth,getaddressByid )
addRouter.post("/address",zValidator('json',addressValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth ,createaddress)
addRouter.put("/address/:id",adminRoleAuth, updateaddress)
addRouter.delete("/address/:id", bothRoleAuth,deleteaddress)


