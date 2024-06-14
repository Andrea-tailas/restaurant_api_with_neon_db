import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from "./users/user.router";
import { usersRouter } from "./city/city.router";
import { statcatRouter } from "./status-catalog/statcat.router";
import { stateRouter } from "./state/state.router";
import { orderstatRouter } from "./order-status/orderstat.router";
import { driverRouter } from "./driver/driver.router";
import { catRouter } from "./category/category.router";
import { addRouter } from "./address/address.router";
import {commentRouter} from "./comments/comment.router"
import { restRouter } from "./restaurant/restaurant.router";
import {restownerRouter} from "./restaurant-owner/restowner.router"
import { orderRouter } from "./orders/order.router";
import { menuRouter } from "./menu-item/menu.router";
import { ordermenuRouter } from "./order-menu-item/orderm.router";
import {authRouter} from "./auth/auth.router"
import {html} from "hono/html"
const app = new Hono()


//default route
app.get('/', (c) => {
  return c.html(
    html`
    <h1>Welcome to the API</h1>
    <p>My name is Titus Waititu and this is my API</p>
    <p>Use the following routes to interact with the API</p>
    <ul>
      <li><a href="/api">/api</a></li>
      <li><a href="/users">/users</a></li>
      <li><a href="/state">/state</a></li>
      <li><a href="/order-status">/order-status</a></li>
      <li><a href="/driver">/driver</a></li>
      <li><a href="/category">/category</a></li>
      <li><a href="/address">/address</a></li>
      <li><a href="/comment">/comment</a></li>
      <li><a href="/restaurant">/restaurant</a></li>
      <li><a href="/restaurant-owner">/restaurant-owner</a></li>
      <li><a href="/order">/order</a></li>
      <li><a href="/menu-item">/menu-item</a></li>
      <li><a href="/order-menu-item">/order-menu-item</a></li>
      </ul>
    `
  )
})


//custom route
app.route('/api',userRouter)
app.route('/',usersRouter)
app.route('/',statcatRouter)
app.route('/',stateRouter)
app.route('/',orderstatRouter)
app.route('/',driverRouter)
app.route('/',catRouter)
app.route('/',addRouter)
app.route('/',commentRouter)
app.route('/',restRouter)
app.route('/',restownerRouter)
app.route('/',orderRouter)
app.route('/',menuRouter)
app.route('/',ordermenuRouter)
app.route('auth/',authRouter)

console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT) || 3000
})
