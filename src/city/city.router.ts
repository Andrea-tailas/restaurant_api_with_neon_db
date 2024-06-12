import {allCities,createCity,getcityByid,updateCity,deleteCity} from "./city.controller"
import { Hono } from "hono";
import { cityValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth } from "../middleware/bearAuth";

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
}),createCity)
//update a city
usersRouter.put("/city/:id", updateCity)
//remove a city
usersRouter.delete("/city/:id", deleteCity)