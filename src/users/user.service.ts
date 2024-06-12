import db from "../drizzle/db"
import { usersTable } from "../drizzle/schema"
import { UserInsert,UserSelect } from "../drizzle/schema"
import {  eq } from "drizzle-orm";


export const usersService = async (limit?: number): Promise<UserSelect[] | null> => {
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit,
            with: {
                address: true,
                comment: true,
                driver: true,
                orders: true,
                restaurant_owner: true
            }
        });
    }
    return await db.query.usersTable.findMany({
    with: {
        address: true,
        comment: true,
        driver: true,
        orders: true,
        restaurant_owner: true
    }
    });
}
export const getUserService = async (id: number) => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
      columns: {
        id: true,
        name: true,
        email: true,
        address: true,
        Comment: true
      } 
    })
}


export const createUserService = async (user: UserInsert) => {
    await db.insert(usersTable).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: UserInsert) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully";
}
