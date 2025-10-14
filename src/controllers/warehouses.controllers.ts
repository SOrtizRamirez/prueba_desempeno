import { type Request, type Response } from 'express';
import { getWarehouseService, addWarehouseService, getWarehouseByIdService, updateWarehouseService, deleteWarehouseService } from "../services/warehouses.services.ts";

export const getWarehouseController = (req:Request, res:Response) => {
    try{
        getWarehouseService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addWarehouseController = async (req: Request, res: Response) => {
    try {
        const { name, location, active } = req.body;
        const savedWarehouse = await addWarehouseService( name, location, active );
        return res.status(201).json(savedWarehouse);
    } catch (e) {
        res.sendStatus(400).json({message: e});
    }
};

export const getWarehouseByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(!id) return res.status(401).json({ error: "Bodega no encontrada." });
        const Warehouse = await getWarehouseByIdService( id);
        res.json(Warehouse);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateWarehouseController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const updatedWarehouse = await updateWarehouseService(Number(id), updatedData);

        if (!updatedWarehouse) return res.status(404).json({ message: "Bodega no encontrada" });

        res.json({ message: "Bodega actualizada correctamente", updatedWarehouse });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteWarehouseController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteWarehouseService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Bodega no encontrado" });
        }
        return res.status(200).json({ message: "Bodega eliminada" });
    } catch (e) {
        res.sendStatus(400);
    }
};


