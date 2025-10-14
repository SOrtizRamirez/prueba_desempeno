import { type Request, type Response } from 'express';
import { getOrdersService,
    addOrdersService,
    getOrderByIdService,
    updateOrdersService,
    deleteOrdersService } from '../services/orders.services.ts'
import { getRoleFromJWT } from "../middlewares/routes.middleware.ts";

export const getOrdersController = (req:Request, res:Response) => {
    try{
        getOrdersService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addOrdersController = async (req: Request, res: Response) => {
    try {
        const role = getRoleFromJWT(req);
        if (!role) {
            return res.status(401).json({ error: "No autorizado: token inválido o ausente" });
        }
        const { clientId, productId, warehouseId, addressId, status, quantity } = req.body;
        const savedOrders = await addOrdersService(role, clientId, productId, warehouseId, addressId, status, quantity );
        return res.status(201).json(savedOrders);
    } catch (e) {
        const code = Number(e?.status || 500);
        return res.status(Number.isInteger(code) ? code : 500).json({ error: e?.message ?? "Error" });
    }
};

export const getOrdersByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const Orders = await getOrderByIdService(id);

        res.json(Orders);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateOrdersController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const role = getRoleFromJWT(req);
        if (!role) {
            return res.status(401).json({ error: "No autorizado: token inválido o ausente" });
        }
        const updatedData = req.body;

        const updatedOrder = await updateOrdersService(role, Number(id), updatedData);

        if (!updatedOrder) return res.status(404).json({ message: "Orden no encontrada" });

        res.json({ message: "Orden actualizada correctamente", updatedOrder });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteOrdersController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteOrdersService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        return res.status(200).json({ message: "Orden eliminada" });
    } catch (e) {
        res.sendStatus(400);
    }
};

