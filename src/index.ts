import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { userRouter } from './Users/user.router'
import { statesRouter } from './states/states.router'
import { addressRouter } from './address/address.router'
import { cityRouter } from './city/city.router'
import { resturantRouter } from './resturant/resturant.router'
import { restaurant_ownerRouter } from './restaurant_owner/restaurant_owner.router'
import { categoryRouter } from './category/category.router'
import { menu_itemRouter } from './menu_item/menu_item.router'
import { ordersRouter } from './orders/orders.router'
import { order_menu_itemRouter } from './order_menu_item/order_menu_item .router'
import { order_statusRouter } from './order_status/order_status.router'
import { status_catalogRouter } from './status_catalog/status_catalog.router'
import { commentRouter } from './comment/comment.router'
import { driverRouter } from './driver/driver.router'
import { authRouter} from './auth/auth.router'
const app = new Hono()

//default route//
app.get('/', (c) => {
  return c.text('the code is okay')
})

app.route("/api",userRouter)
app.route("/api",statesRouter)
app.route("/api",addressRouter)
app.route("/api",cityRouter)
app.route("/api",resturantRouter)
app.route("/api",restaurant_ownerRouter)
app.route("/api",categoryRouter)
app.route("/api",menu_itemRouter)
app.route("/api",ordersRouter)
app.route("/api",order_menu_itemRouter)
app.route("/api",order_statusRouter)
app.route("/api",status_catalogRouter)
app.route("/api",commentRouter)
app.route("/api",driverRouter)
app.route("/api",authRouter)
console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT)
})
