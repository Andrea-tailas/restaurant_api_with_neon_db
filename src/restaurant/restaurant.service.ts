import db from "../drizzle/db"
import { restaurantTable } from "../drizzle/schema"
import { restInsert,restSelect} from "../drizzle/schema"
import { asc,eq } from "drizzle-orm";


export const restService = async (limit?: number): Promise<restSelect[] | null> => {
    if (limit) {
        return await db.query.restaurantTable.findMany({
            limit: limit,
            with: { 
              menu_item: {
                columns:{
                  restaurant_id:false,
                  category_id:false
                }
              },
              orders: {
                columns:{
                  userId:false,
                  restaurantId:false,
                  deliveryAddressId:false,  
                driverId:false
                }
              },
              restaurant_owner: {
                columns:{
                  restaurant_id:false,
                  owner_id:false
                }
              },
              city: {
                columns:{
                  state_id:false
                }
              }
            },
            orderBy: [asc(restaurantTable.id)]
        });
    }
    return await db.query.restaurantTable.findMany({
        with: { 
            menu_item: {
              columns:{
                restaurant_id:false,
                category_id:false
              }
            },
            orders: {
              columns:{
                userId:false,
                restaurantId:false,
                deliveryAddressId:false,  
              driverId:false
              }
            },
            restaurant_owner: {
              columns:{
                restaurant_id:false,
                owner_id:false
              }
            },
            city: {
              columns:{
                state_id:false
              }
            }
          }
    });
}

export const getrestService = async (id: number): Promise<restInsert | undefined> => {
    return await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id),
        with: { 
            menu_item: {
              columns:{
                restaurant_id:false,
                category_id:false
              }
            },
            orders: {
              columns:{
                userId:false,
                restaurantId:false,
                deliveryAddressId:false,  
              driverId:false
              }
            },
            restaurant_owner: {
              columns:{
                restaurant_id:false,
                owner_id:false
              }
            },
            city: {
              columns:{
                state_id:false
              }
            }
          }
    })
}

export const createrestService = async (rest: restInsert) => {
    await db.insert(restaurantTable).values(rest)
    return "restaurant created successfully";
}

export const updaterestService = async (id: number, rest: restInsert) => {
    await db.update(restaurantTable).set(rest).where(eq(restaurantTable.id, id))
    return "restaurant updated successfully";
}

export const deleterestService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "restaurant deleted successfully";
}
