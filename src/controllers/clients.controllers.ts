import { type Request, type Response } from 'express';
import {
    getClientsService,
    getClientByIdService,
    addClientsService,
    deleteClientsService,
    updateClientsService,
    getClientByCedulaServices,
    getStoryByClient
} from "../services/clients.services.ts";

export const getClientsController = (req:Request, res:Response) => {
    try{
        getClientsService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addClientsController = async (req: Request, res: Response) => {
    try {
        const { cedula, name, email } = req.body;
        const savedClient = await addClientsService( cedula, name, email );
        return res.status(201).json(savedClient);
    } catch (e) {
        const code = Number(e?.status || 500);
        return res.status(Number.isInteger(code) ? code : 500).json({ error: e?.message ?? "Error" });
    }
};

export const getClientsByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(!id) return res.status(401).json({ error: "Cliente no encontrado." });
        const Clients = await getClientByIdService( id);
        res.json(Clients);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateClientsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const updatedClient = await updateClientsService(Number(id), updatedData);

        if (!updatedClient) return res.status(404).json({ message: "Cliente no encontrado" });

        res.json({ message: "Cliente actualizado correctamente", updatedClient });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteClientsController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteClientsService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        return res.status(200).json({ message: "Cliente eliminado" });
    } catch (e) {
        res.sendStatus(400);
    }
};

export const getClientByCedulaController = async (req: Request, res: Response) => {
    try {
        const cc = Number(req.params.cedula);
        if(!cc) return res.status(401).json({ error: "Cliente no encontrado" });
        const client = await getClientByCedulaServices(cc)
        return res.status(200).json(client);
    } catch(e) {
        res.sendStatus(400).json({message: e});
    }
};

export const getStoryByClientController = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        if(!id) return res.status(404).json({ message: "Usuario no encontrado" });
        const stories = await getStoryByClient(id)
        if(!stories) return res.status(404).json({ message: "Historial no encontrado" });
        return res.status(200).json(stories);
    } catch (e) {
        res.sendStatus(400).json({ message: e });
    }
}

