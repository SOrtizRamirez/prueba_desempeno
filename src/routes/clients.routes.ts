import Router from 'express';

import { getClientsController,
    addClientsController,
    deleteClientsController,
    getClientsByIdController,
    updateClientsController,
    getClientByCedulaController,
    getStoryByClientController } from "../controllers/clients.controllers.ts";

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";

import { authenticateAccessToken } from "../middlewares/auth.middleware.ts";


const clientsRouter = Router();

clientsRouter.get("/clients", authenticateAccessToken, requireRoleFromDB, getClientsController);

clientsRouter.post("/clients", authenticateAccessToken, requireRoleFromDB, addClientsController);

clientsRouter.delete("/clients/:id", authenticateAccessToken, requireRoleFromDB, deleteClientsController);

clientsRouter.patch("/clients/:id", authenticateAccessToken, requireRoleFromDB, updateClientsController);

clientsRouter.get('/clients/:id',  authenticateAccessToken, requireRoleFromDB, getClientsByIdController);

clientsRouter.get('/clients/cc/:cc',  authenticateAccessToken, requireRoleFromDB, getClientByCedulaController);

clientsRouter.get('/clients/story',  authenticateAccessToken, requireRoleFromDB, getStoryByClientController);


export default clientsRouter;