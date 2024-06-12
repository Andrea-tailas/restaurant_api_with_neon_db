import {liststatcat,createStatcat,updateStatcat,getStatcatid,deleteStatcat} from "./statcat.controller"
import { Hono } from "hono";
import {statusCatalogValidator} from "../validators"
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth } from "../middleware/bearAuth";

export const statcatRouter = new Hono();
     
statcatRouter.get("/statuscatalogues",adminRoleAuth, liststatcat);    
statcatRouter.get("/statuscatalogue/:id",getStatcatid )
statcatRouter.post("/statuscatalogue",zValidator('json',statusCatalogValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createStatcat)
statcatRouter.put("/statuscatalogue/:id", updateStatcat)
statcatRouter.delete("/statuscatalogue/:id", deleteStatcat)