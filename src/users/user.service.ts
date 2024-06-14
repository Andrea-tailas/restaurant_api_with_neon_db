import db from "../drizzle/db"
import { usersTable } from "../drizzle/schema"
import { UserInsert,UserSelect } from "../drizzle/schema"
import {  asc, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


export const usersService = async (limit?: number): Promise<UserSelect[] | null> => {
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit,
            with: {
                address: {
                    columns:{
                        user_id:false,
                        city_id:false
                    }
                },
                comment: {
                    columns:{
                        user_id:false,
                        order_id:false
                    }
                },
                driver: {
                    columns:{
                        user_id:false
                    }
                },
                orders: {
                    columns:{
                        restaurantId:false,
                        userId:false,
                        driverId:false,
                        deliveryAddressId:false
                    }
                
                },
                restaurant_owner: {
                    columns:{
                        restaurant_id:false,
                        owner_id:false
                    }
                }
            },
            orderBy:[asc(usersTable.id)],
            extras:{
                loweredName:sql`lower(${usersTable.name})`.as("loweredName")
            }
        });
    }
    return await db.query.usersTable.findMany({
        with: {
            address: {
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            comment: {
                columns:{
                    user_id:false,
                    order_id:false
                }
            },
            driver: {
                columns:{
                    user_id:false
                }
            },
            orders: {
                columns:{
                    restaurantId:false,
                    userId:false,
                    driverId:false,
                    deliveryAddressId:false
                }
            
            },
            restaurant_owner: {
                columns:{
                    restaurant_id:false,
                    owner_id:false
                }
            }
        },
    orderBy:[asc(usersTable.id)],
    extras:{
        loweredName:sql`lower(${usersTable.name})`.as("loweredName")
    }
    });
}
export const getUserService = async (id: number)=> {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with: {
            address: {
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            comment: {
                columns:{
                    user_id:false,
                    order_id:false
                }
            },
            driver: {
                columns:{
                    user_id:false
                }
            },
            orders: {
                columns:{
                    restaurantId:false,
                    userId:false,
                    driverId:false,
                    deliveryAddressId:false
                }
            
            },
            restaurant_owner: {
                columns:{
                    restaurant_id:false,
                    owner_id:false
                }
            }
        },
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
