import db from "../drizzle/db"
import { restaurantownerTable } from "../drizzle/schema"
import { restownerInsert,restownerSelect} from "../drizzle/schema"
import {asc, eq } from "drizzle-orm";


export const restownerService = async (limit?: number): Promise<restownerSelect[] | null> => {
    if (limit) {
        return await db.query.restaurantownerTable.findMany({
            limit: limit,
            with: { 
                restaurant: {
                    columns:{
                        city_id:false
                    }
                },
                user: true
            },
            orderBy: [asc(restaurantownerTable.id)]
        });
    }
    return await db.query.restaurantownerTable.findMany({
        with: { 
            restaurant: {
                columns:{
                    city_id:false
                }
            },
            user: true
        },
        orderBy: [asc(restaurantownerTable.id)]
    });
}

export const getrestownerService = async (id: number): Promise<restownerInsert | undefined> => {
    return await db.query.restaurantownerTable.findFirst({
        where: eq(restaurantownerTable.id, id),
        with: { 
            restaurant: {
                columns:{
                    city_id:false
                }
            },
            user: true
        },
    })
}

export const createrestownerService = async (rest: restownerInsert) => {
    await db.insert(restaurantownerTable).values(rest)
    return "restaurant owner created successfully";
}

export const updaterestownerService = async (id: number, rest: restownerInsert) => {
    await db.update(restaurantownerTable).set(rest).where(eq(restaurantownerTable.id, id))
    return "restaurant owner updated successfully";
}

export const deleterestownerService = async (id: number) => {
    await db.delete(restaurantownerTable).where(eq(restaurantownerTable.id, id))
    return "restaurant owner deleted successfully";
}
