import { listState,createState,updateState,deleteState,getStateid } from "./state.controller";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { stateValidator } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const stateRouter = new Hono();

//get all state      
stateRouter.get("/states",adminRoleAuth, listState);
//get a single state    
stateRouter.get("/state/:id",getStateid )
// create a state 
stateRouter.post("/state",zValidator('json',stateValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createState)
//update a state
stateRouter.put("/state/:id", updateState)
//remove a state
stateRouter.delete("/state/:id", deleteState)