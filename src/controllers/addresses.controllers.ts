import { type Request, type Response } from 'express';
import { getAddressService, 
    addAddressService, 
    getAddressByIdService, 
    updateAddressService, 
    deleteAddressService } from "../services/addresses.services.ts";

export const getAddressController = (req:Request, res:Response) => {
    try{
        getAddressService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addAddressController = async (req: Request, res: Response) => {
    try {
        const { clientId, address, city, active } = req.body;
        const savedAddress = await addAddressService( clientId, address, city, active );
        return res.status(201).json(savedAddress);
    } catch (e) {
        res.sendStatus(400).json({message: e});
    }
};

export const getAddressByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(!id) return res.status(401).json({ error: "Dirección no encontrado." });
        const Address = await getAddressByIdService( id);
        res.json(Address);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateAddressController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const updatedOrder = await updateAddressService(Number(id), updatedData);

        if (!updatedOrder) return res.status(404).json({ message: "Dirección no encontrada" });

        res.json({ message: "Dirección actualizada correctamente", updatedOrder });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteAddressController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteAddressService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Dirección no encontrado" });
        }
        return res.status(200).json({ message: "Dirección eliminado" });
    } catch (e) {
        res.sendStatus(400);
    }
};


