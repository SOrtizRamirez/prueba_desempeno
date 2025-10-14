import Router from 'express';

import {addAddressController, deleteAddressController, getAddressByIdController, getAddressController, updateAddressController} from "../controllers/addresses.controllers.ts";

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";

import { authenticateAccessToken } from "../middlewares/auth.middleware.ts";


const addressesRouter = Router();

addressesRouter.get("/addresses", authenticateAccessToken, requireRoleFromDB, getAddressController);

addressesRouter.post("/addresses", authenticateAccessToken, requireRoleFromDB, addAddressController);

addressesRouter.delete("/addresses/:id", authenticateAccessToken, requireRoleFromDB, deleteAddressController);

addressesRouter.patch("/addresses/:id", authenticateAccessToken, requireRoleFromDB, updateAddressController);

addressesRouter.get('/addresses/:id',  authenticateAccessToken, requireRoleFromDB, getAddressByIdController);



export default addressesRouter;