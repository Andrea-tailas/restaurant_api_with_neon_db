import {listdrivers,createdriver,updatedriver,getdriverid,deletedriver} from "./driver.controller"
import { driverValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {driverRoleAuth } from "../middleware/bearAuth";
import { adminRoleAuth } from "../middleware/bearAuth";

export const driverRouter = new Hono();

     
driverRouter.get("/drivers",driverRoleAuth , listdrivers);    
driverRouter.get("/driver/:id",getdriverid )
driverRouter.post("/driver",zValidator('json',driverValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createdriver)
driverRouter.put("/driver/:id", updatedriver)
driverRouter.delete("/driver/:id", deletedriver)

