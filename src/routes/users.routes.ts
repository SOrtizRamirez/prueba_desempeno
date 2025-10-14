import Router from 'express';

import {
    addUsersController,
    deleteUsersController,
    updateUsersController,
    getUsersByIdController,
    getUsersController, loginController } from '../controllers/users.controllers.ts';

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";


const usersRouter = Router();

usersRouter.get("/users", requireRoleFromDB, getUsersController);

usersRouter.post("/register", addUsersController);

usersRouter.post("/login", loginController);

usersRouter.delete("/users/:id", requireRoleFromDB, deleteUsersController);

usersRouter.patch("/users/:id", updateUsersController);

usersRouter.get('/users/:id', requireRoleFromDB, getUsersByIdController);


export default usersRouter;