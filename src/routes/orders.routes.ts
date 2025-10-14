import Router from 'express';

import { getOrdersByIdController, 
    addOrdersController, 
    deleteOrdersController, 
    getOrdersController, 
    updateOrdersController } from '../controllers/orders.controllers.ts';

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";

import { authenticateAccessToken } from "../middlewares/auth.middleware.ts";


const ordersRouter = Router();

ordersRouter.get("/orders", authenticateAccessToken, getOrdersController);

ordersRouter.post("/orders", authenticateAccessToken, requireRoleFromDB, addOrdersController);

ordersRouter.delete("/orders/:id", authenticateAccessToken, requireRoleFromDB, deleteOrdersController);

ordersRouter.patch("/orders/:id", authenticateAccessToken, updateOrdersController);

ordersRouter.get('/orders/:id',  authenticateAccessToken, getOrdersByIdController);

export default ordersRouter;