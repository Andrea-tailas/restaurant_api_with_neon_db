import {listdrivers,createdriver,updatedriver,getdriverid,deletedriver} from "./driver.controller"
import { driverValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
// import {driverRoleAuth } from "../middleware/bearAuth";
import { adminRoleAuth ,bothRoleAuth} from "../middleware/bearAuth";

export const driverRouter = new Hono();

     
driverRouter.get("/drivers",adminRoleAuth , listdrivers);    
driverRouter.get("/driver/:id",bothRoleAuth,getdriverid )
driverRouter.post("/driver",adminRoleAuth,zValidator('json',driverValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createdriver)
driverRouter.put("/driver/:id", adminRoleAuth,updatedriver)
driverRouter.delete("/driver/:id",adminRoleAuth, deletedriver)

