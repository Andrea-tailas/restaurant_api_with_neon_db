import {listCategory,createCategory,updateCategory,getCategoryid,deleteCategory} from "./category.controller"
import { Hono } from "hono";
import { categoryValidator } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth } from "../middleware/bearAuth";

export const catRouter = new Hono();

//get all category      
catRouter.get("/categories",adminRoleAuth, listCategory);
//get a single category    
catRouter.get("/category/:id",getCategoryid )
// create a category 
catRouter.post("/category",zValidator('json',categoryValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createCategory)
//update a category
catRouter.put("/category/:id", updateCategory)
//remove a category
catRouter.delete("/category/:id", deleteCategory)