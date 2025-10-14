import Router from 'express';

import { addWarehouseController, deleteWarehouseController, updateWarehouseController, getWarehouseByIdController, getWarehouseController} from "../controllers/warehouses.controllers.ts";

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";

import { authenticateAccessToken } from "../middlewares/auth.middleware.ts";


const warehousesRouter = Router();

warehousesRouter.get("/warehouses", authenticateAccessToken, requireRoleFromDB, getWarehouseController);

warehousesRouter.post("/warehouses", authenticateAccessToken, requireRoleFromDB, addWarehouseController);

warehousesRouter.delete("/warehouses/:id", authenticateAccessToken, requireRoleFromDB, deleteWarehouseController);

warehousesRouter.patch("/warehouses/:id", authenticateAccessToken, requireRoleFromDB, updateWarehouseController);

warehousesRouter.get('/warehouses/:id',  authenticateAccessToken, requireRoleFromDB, getWarehouseByIdController);



export default warehousesRouter;