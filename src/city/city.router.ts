import {allCities,createCity,getcityByid,updateCity,deleteCity} from "./city.controller"
import { Hono } from "hono";
import { cityValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth,bothRoleAuth } from "../middleware/bearAuth";

export const usersRouter = new Hono();

//get all city      
usersRouter.get("/cities",adminRoleAuth, allCities)
//get a single city    
usersRouter.get("/city/:id",getcityByid )
// create a city
usersRouter.post("/city",zValidator('json',cityValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,createCity)
//update a city
usersRouter.put("/city/:id", bothRoleAuth,updateCity)
//remove a city
usersRouter.delete("/city/:id", bothRoleAuth, deleteCity)