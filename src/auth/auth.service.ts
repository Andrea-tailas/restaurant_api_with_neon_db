import {usersTable,UserInsert,UserSelect } from "../drizzle/schema";
import db from "../drizzle/db";
import {sql} from "drizzle-orm"
import { SendMail } from "../NodeMail/mail";

export const createAuthUserService = async (user: UserInsert):Promise<string | null> => {
    await db.insert(usersTable).values(user)
    return "User created successfully";
}


export const userLoginService = async (user: UserInsert) => {
    const { username } = user;
    return await db.query.usersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql`${usersTable.username} = ${username} `,
    })
}