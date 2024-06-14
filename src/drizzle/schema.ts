import { pgTable, integer, varchar, serial, decimal, boolean, timestamp , pgEnum} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

// Define User model
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  contact_phone: varchar('contact_phone', { length: 255 }),
  phone_verified: boolean('phone_verified'),
  email: varchar('email', { length: 255 }),
  email_verified: boolean('email_verified'),
  confirmation_code: varchar('confirmation_code', { length: 255 }),
  password: varchar('password', { length: 255 }),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
  //user relations
  export const userRelations = relations(users, ({many}) => ({
    comment: many(comment),
    address: many(address),
    orders: many(orders),
    driver: many(driver),
    restaurant_owner: many(restaurant_owner)
  }))
 

// Define Address model
export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  street_address_1: varchar('street_address_1', { length: 255 }),
  street_address_2: varchar('street_address_2', { length: 255 }),
  zip_code: varchar('zip_code', { length: 255 }),
  delivery_instructions: varchar('delivery_instructions', { length: 255 }),
  user_id: integer('user_id').references(() => users.id),
  // city_id: integer('city_id').references(() => city.id),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
//address relations
export const addressRelations = relations(address, ({one, many}) => ({
  user: one(users, {
      fields: [address.user_id],
      references: [users.id]
  }),
  city: one(city, {
    fields: [address.user_id],
    references: [city.id]
}),
  orders: many(orders),
 

}))

// Define City model
export const city = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  state_id: integer('state_id').references(() => state.id),
});

// Define State model
export const state = pgTable('state', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  code: varchar('code', { length: 255 }),
});

//state(1) -- state(n)
export const state_state = relations(state,({ many})=>({
cities:many(city)
}));

//city(n) -- state(1)
export const city_state = relations(city,({ one})=>({
  state:one(state,{
    fields:[city.id],
    references:[state.id]
  })
}));

// Define Restaurant model
export const restaurant = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  street_address: varchar('street_address', { length: 255 }),
  zip_code: varchar('zip_code', { length: 255 }),
  city_id: integer('city_id').references(() => city.id),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
//restaurant relations
export const restaurantRelations = relations(restaurant, ({one, many}) => ({
  city: one(city, {
      fields: [restaurant.city_id],
      references: [city.id]
  }),
  menu_item: many(menu_item),
  orders: many(orders),
  restaurant_owner: many(restaurant_owner)
}))

// Define RestaurantOwner model
export const restaurant_owner = pgTable('restaurant_owner', {
  id: serial('id').primaryKey(),
  restaurant_id: integer('restaurant_id').references(() => restaurant.id),
  owner_id: integer('owner_id').references(() => users.id),
});
//restaurant owner relations
export const restaurant_ownerRelations = relations(restaurant_owner, ({one}) => ({
    restaurant: one(restaurant, {
        fields: [restaurant_owner.restaurant_id],
        references: [restaurant.id]
    }),
    user: one(users, {
        fields: [restaurant_owner.owner_id],
        references: [users.id]
    })
}))
 

// Define Category model
export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
});
export const categoryRelations = relations(category, ({many}) => ({
  menu_item: many(menu_item)
}))


// Define MenuItem model
export const menu_item = pgTable('menu_item', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  restaurant_id: integer('restaurant_id').references(() => restaurant.id),
  category_id: integer('category_id').references(() => category.id),
  description: varchar('description', { length: 255 }),
  ingredients: varchar('ingredients', { length: 255 }),
  price: decimal('price'),
  active: boolean('active'),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});

//menu items relations
export const menu_itemRelations = relations(menu_item, ({one, many}) => ({
  restaurant: one(restaurant, {
      fields: [menu_item.restaurant_id],
      references: [restaurant.id]
  }),
  category: one(category, {
      fields: [menu_item.category_id],
      references: [category.id]
  }),
  order_menu_item: many(order_menu_item)
}))

// Define Order model
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  restaurant_id: integer('restaurant_id').references(() => restaurant.id),
  estimated_delivery_time: timestamp('estimated_delivery_time'),
  actual_delivery_time: timestamp('actual_delivery_time'),
  delivery_address_id: integer('delivery_address_id').references(() => address.id),
  user_id: integer('user_id').references(() => users.id),
  driver_id: integer('driver_id').references(() => driver.id),
  price: decimal('price'),
  discount: decimal('discount'),
  final_price: decimal('final_price'),
  comment: varchar('comment', { length: 255 }),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
//orders relations
export const ordersRelations = relations(orders, ({one, many}) => ({
  user: one(users, {
      fields: [orders.user_id],
      references: [users.id]
  }),
  driver: one(driver, {
      fields: [orders.driver_id],
      references: [driver.id]
  }),
  restaurant: one(restaurant, {
      fields: [orders.restaurant_id],
      references: [restaurant.id]
  }),
  address: one(address, {
      fields: [orders.delivery_address_id],
      references: [address.id]
  }),
  order_status: many(order_status),
  comments: many(comment),
  order_menu_item: many(order_menu_item)
}))

// Define OrderMenuItem model
 export const order_menu_item = pgTable('order_menu_item', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  menu_item_id: integer('menu_item_id').references(() => menu_item.id),
  quantity: integer('quantity'),
  item_price: decimal('item_price'),
  price: decimal('price'),
  comment: varchar('comment', { length: 255 }),
});
//order menu item relations
export const order_menu_itemRelations = relations(order_menu_item, ({one}) => ({
  order: one(orders, {
      fields: [order_menu_item.order_id],
      references: [orders.id]
  }),
  menu_item: one(menu_item, {
      fields: [order_menu_item.menu_item_id],
      references: [menu_item.id]
  })
}))
// Define OrderStatus model
export const order_status = pgTable('order_status', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  status_catalog_id: integer('status_catalog_id').references(() => status_catalog.id),
  // created_at: timestamp('created_at'),
});
//order status relations
export const order_statusRelations = relations(order_status, ({one}) => ({
  order: one(orders, {
      fields: [order_status.order_id],
      references: [orders.id]
  }),
  status_catalog: one(status_catalog, {
      fields: [order_status.status_catalog_id],
      references: [status_catalog.id]
  })
}))


// Define StatusCatalog model
 export const status_catalog = pgTable('status_catalog', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
});
//status catalog relations
export const status_catalogRelations = relations(status_catalog, ({many}) => ({
  order_status: many(order_status)
}))

//export Comment model
 export const comment = pgTable('comment', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  user_id: integer('user_id').references(() => users.id),
  comment_text: varchar('comment_text', { length: 255 }),
  is_complaint: boolean('is_complaint'),
  is_praise: boolean('is_praise'),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
//   comment relations
export const commentRelations = relations(comment, ({one}) => ({
  user: one(users, {
      fields: [comment.user_id],
      references: [users.id]
  }),
  orders: one(orders, {
      fields: [comment.order_id],
      references: [orders.id]    
  })
}))


// Define Driver model
export const driver = pgTable('driver', {
  id: serial('id').primaryKey(),
  car_make: varchar('car_make', { length: 255 }),
  car_model: varchar('car_model', { length: 255 }),
  car_year: integer('car_year'),
  user_id: integer('user_id').references(() => users.id),
  online: boolean('online'),
  delivering: boolean('delivering'),
  // created_at: timestamp('created_at'),
  // updated_at: timestamp('updated_at'),
});
//driver relations
export const driverRelations = relations(driver, ({one, many}) => ({
  user: one(users, {
      fields: [driver.user_id],
      references: [users.id]
  }),
  orders: many(orders)
}))


export const roleEnum = pgEnum("role", ["admin", "user"])

export const AuthOnUsersTable = pgTable("auth_on_users", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 90 }),
    username: varchar("username", { length: 90 }),
    role: roleEnum("role").default("user")
});

export const AuthOnUsersRelations = relations(AuthOnUsersTable, ({ one }) => ({
    users: one(users, {
        fields: [AuthOnUsersTable.userId],
        references: [users.id]
    })
}));



export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;

export type TIStates = typeof state.$inferInsert;
export type TSStates = typeof state.$inferSelect;

export type TIAddress = typeof address.$inferInsert;
export type TSAddress = typeof address.$inferSelect;

export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;

export type TIRestaurant = typeof restaurant.$inferInsert;
export type TSRestaurant = typeof restaurant.$inferSelect;


export type TIRestaurant_owner = typeof restaurant_owner.$inferInsert;
export type TSRestaurant_owner = typeof restaurant_owner.$inferSelect;

export type TICategory = typeof category.$inferInsert;
export type TSCategory = typeof category.$inferSelect;

export type TIMenu_item = typeof menu_item.$inferInsert;
export type TSMenu_item = typeof menu_item.$inferSelect;

export type TIOrders = typeof orders.$inferInsert;
export type TSOrders = typeof orders.$inferSelect;

export type TIOrder_menu_item = typeof order_menu_item.$inferInsert;
export type TSOrder_menu_item = typeof order_menu_item.$inferSelect;


export type TIOrder_status = typeof order_status.$inferInsert;
export type TSOrder_status = typeof order_status.$inferSelect;

export type TIStatus_catalog = typeof status_catalog.$inferInsert;
export type TSStatus_catalog = typeof status_catalog.$inferSelect;


export type TIComment = typeof comment.$inferInsert;
export type TSComment = typeof comment.$inferSelect;


export type TIDriver = typeof driver.$inferInsert;
export type TSDriver = typeof driver.$inferSelect;


export type TIAuthOnUser = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUser = typeof AuthOnUsersTable.$inferSelect;