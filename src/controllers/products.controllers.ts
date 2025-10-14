import { type Request, type Response } from 'express';
import { getProductsService,
    getProductsByIdService,
    addProductsService,
    deleteProductsService,
    updateProductsService,
    getProductByCodeService } from "../services/products.services.ts";

export const getProductsController = (req:Request, res:Response) => {
    try{
        getProductsService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addProductsController = async (req: Request, res: Response) => {
    try {
        const { code, name, description, stock, warehouseId, active } = req.body;
        const savedProduct = await addProductsService( code, name, description, stock, warehouseId, active );
        return res.status(201).json(savedProduct);
    } catch (e) {
        const code = Number(e?.status || 500);
        return res.status(Number.isInteger(code) ? code : 500).json({ error: e?.message ?? "Error" });
    }
};

export const getProductsByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(!id) return res.status(401).json({ error: "Producto no encontrado." });
        const Products = await getProductsByIdService( id);
        res.json(Products);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateProductsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const updatedProduct = await updateProductsService(Number(id), updatedData);

        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });

        res.json({ message: "Producto actualizado correctamente", updatedProduct });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteProductsController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteProductsService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.status(200).json({ message: "Producto eliminado" });
    } catch (e) {
        res.sendStatus(400);
    }
};

export const getProductsByCodeController = async (req: Request, res: Response) => {
    try {
        const code = Number(req.params.cedula);
        if(!code) return res.status(401).json({ error: "Producto no encontrado" });
        const product = await getProductByCodeService(code)
        return res.status(200).json(product);
    } catch(e) {
        res.sendStatus(400).json({message: e});
    }
}

