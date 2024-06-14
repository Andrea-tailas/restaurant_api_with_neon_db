import { addressSelect, addressInsert, addressTable2 } from "../drizzle/schema"
import db from "../drizzle/db"
import { asc, eq } from "drizzle-orm";
import { addressTable } from "../drizzle/schema";



export const listaddresses = async (limit?: number): Promise<addressSelect[] | null> => {
    if (limit) {
        return await db.query.addressTable.findMany({
            limit: limit,
            with: {
                user: true,
                city: {
                    columns: {
                        state_id: false,
                    }
                },
                orders: {
                    columns: {
                        restaurantId: false,
                        userId: false,
                        driverId: false,
                        deliveryAddressId: false,
                    }
                }
            }
            , orderBy: [asc(addressTable.id)]
        });
    }

return await db.query.addressTable.findMany({
    with: {
        user: true,
        city: {
            columns: {
                state_id: false,
            }
        },
        orders: {
            columns: {
                restaurantId: false,
                userId: false,
                driverId: false,
                deliveryAddressId: false,
            }
        }
    }
});

}

export const addressTableCreate = async (add: addressInsert) => {
    await db.insert(addressTable).values(add)
    return "address created successfully";
}



export const addressTableGetid = async (id: number): Promise<addressInsert | undefined> => {
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id),
        with: {
            user: true,
            city: {
                columns: {
                    state_id: false,
                }
            },
            orders: {
                columns: {
                    restaurantId: false,
                    userId: false,
                    driverId: false,
                    deliveryAddressId: false,
                }
            }
        }
    })
}


export const addressTableUpdate = async (id: number, add: addressInsert) => {
    await db.update(addressTable).set(add).where(eq(addressTable.id, id))
    return "address updated successfully";
}

export const addressTableDelete = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "address deleted successfully";
}

// export const 