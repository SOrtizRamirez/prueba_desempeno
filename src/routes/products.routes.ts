import Router from 'express';

import { getProductsByCodeController,
    addProductsController, 
    deleteProductsController, 
    getProductsByIdController, 
    getProductsController, 
    updateProductsController } from "../controllers/products.controllers.ts";

import { requireRoleFromDB } from "../middlewares/routes.middleware.ts";

import { authenticateAccessToken } from "../middlewares/auth.middleware.ts";


const productsRouter = Router();

productsRouter.get("/products", authenticateAccessToken, requireRoleFromDB, getProductsController);

productsRouter.post("/products", authenticateAccessToken, requireRoleFromDB, addProductsController);

productsRouter.delete("/products/:id", authenticateAccessToken, requireRoleFromDB, deleteProductsController);

productsRouter.patch("/products/:id", authenticateAccessToken, requireRoleFromDB, updateProductsController);

productsRouter.get('/products/:id',  authenticateAccessToken, requireRoleFromDB, getProductsByIdController);

productsRouter.get('/products/cd/:cd',  authenticateAccessToken, requireRoleFromDB, getProductsByCodeController);


export default productsRouter;