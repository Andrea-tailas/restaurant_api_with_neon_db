import { Hono } from "hono";
import { listcomments, getcomment, createcomment, updatecomment, deletecomment } from "./comment.controller"
export const commentRouter = new Hono();
import { zValidator } from "@hono/zod-validator";   
import { commentValidator } from "../validators";
import { adminRoleAuth,bothRoleAuth } from "../middleware/bearAuth";

commentRouter.get("/comments",adminRoleAuth, listcomments);
commentRouter.get("/comment/:id",bothRoleAuth, getcomment)
commentRouter.post("/comment", zValidator('json',commentValidator,(result,c)=>{
    if (!result.success){
        return c.json(result.error,400)
    }
}),createcomment)
commentRouter.put("/comment/:id", bothRoleAuth,updatecomment)
commentRouter.delete("/comment/:id", bothRoleAuth,deletecomment)