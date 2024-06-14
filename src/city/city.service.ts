import db from "../drizzle/db"
import { eq } from "drizzle-orm";
import { cityTable } from "../drizzle/schema"
import { cityInsert,citySelect } from "../drizzle/schema"

export const getCities= async (limit?: number): Promise<citySelect[] | null> => {
    if (limit) {
        return await db.query.cityTable.findMany({
            limit: limit,
            with: {
                state: true,
                address: {
                    columns:{
                        user_id:false,
                        city_id:false
                    }
                },
                restaurant:{
                    columns:{
                       city_id:false
                    }
                }
            }
        });
    }
    return await db.query.cityTable.findMany({
        with: {
            state: true,
            address: {
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            restaurant:{
                columns:{
                   city_id:false
                }
            }
        }
    });
}

//create a city
export const cityTableCreate=async (cty: cityInsert) => {
    await db.insert(cityTable).values(cty)
    return "city created successfully";
}


//get a city by id
export const cityTableGetid= async (id: number): Promise<cityInsert | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id),
        with: {
            state: true,
            address: {
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            restaurant:{
                columns:{
                   city_id:false
                }
            }
        }
    })
}

//update a city
export const cityTableUpdate=async (id: number, cty: cityInsert) => {
    await db.update(cityTable).set(cty).where(eq(cityTable.id, id))
    return "city updated successfully";
}

//delete a city
export const cityTableDelete=async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id))
    return "city deleted successfully";
}
