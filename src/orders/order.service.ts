import db from "../drizzle/db"
import { ordersTable } from "../drizzle/schema"
import { orderInsert,orderSelect} from "../drizzle/schema"
import {asc,desc, eq } from "drizzle-orm";


export const orderService = async (limit?: number): Promise<orderSelect[] | null> => {
    if (limit) {
        return await db.query.ordersTable.findMany({
            limit: limit,
            with:{
                comments:{
                    columns:{
                        order_id:false,
                        user_id:false
                    }
                },
                order_menu_item:{
                    columns:{
                        order_id:false,
                        menu_item_id:false
                    }
                },
                restaurant:{
                    columns:{
                        city_id:false
                    }
                },
                address:{
                    columns:{
                        user_id:false,
                        city_id:false
                    }
                },
                user:true,
                driver:{
                    columns:{
                        user_id:false
                    }
                },
                order_status:{
                    columns:{
                        order_id:false
                    }
                }
            },
            orderBy:[desc(ordersTable.id)]
        });
    }
    return await db.query.ordersTable.findMany({
        with:{
            comments:{
                columns:{
                    order_id:false,
                    user_id:false
                }
            },
            order_menu_item:{
                columns:{
                    order_id:false,
                    menu_item_id:false
                }
            },
            restaurant:{
                columns:{
                    city_id:false
                }
            },
            address:{
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            user:true,
            driver:{
                columns:{
                    user_id:false
                }
            },
            order_status:{
                columns:{
                    order_id:false
                }
            }
        }
        ,orderBy:[desc(ordersTable.id)]
    });
}

export const getorderService = async (id: number): Promise<orderInsert | undefined> => {
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id),
        with:{
            comments:{
                columns:{
                    order_id:false,
                    user_id:false
                }
            },
            order_menu_item:{
                columns:{
                    order_id:false,
                    menu_item_id:false
                }
            },
            restaurant:{
                columns:{
                    city_id:false
                }
            },
            address:{
                columns:{
                    user_id:false,
                    city_id:false
                }
            },
            user:true,
            driver:{
                columns:{
                    user_id:false
                }
            },
            order_status:{
                columns:{
                    order_id:false
                }
            }
        },
    })
}

export const createorderService = async (order: orderInsert) => {
    await db.insert(ordersTable).values(order)
    return "order created successfully";
}

export const updateorderService = async (id: number, order: orderInsert) => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.id, id))
    return "order updated successfully";
}

export const deleteorderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "order deleted successfully";
}
