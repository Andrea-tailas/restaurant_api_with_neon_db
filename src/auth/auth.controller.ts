import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";


export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}
export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const foundUser = await userLoginService(user);
        if (foundUser===null) return c.text("User not found", 404);
        const usermatches=await bycrpt.compare(user.password,foundUser?.password as string);
        if (!usermatches) return c.text("Invalid login credentials", 404);
        else{
            const payload={
                sub:foundUser?.username,
                role:foundUser?.role,
                exp:Math.floor(Date.now()/1000)+ (60*60)
            }
            const secret=process.env.JWT_SECRET as string;
            const token=await sign(payload,secret);
            let user=foundUser?.user;
            let role=foundUser?.role;
            return c.json({token,user:{role,...user}},200)
        }
       
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

export const forgotPassword = async (c: Context) => {
    try {
        const email = await c.req.json();
        // TODO: Implement forgot password logic
        return c.json({ msg: "Forgot password email sent" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}