import {Clients} from "../models/clients.model.ts";
import {Orders} from "../models/orders.model.ts";

const getClientsService = async (): Promise<Clients[]>=> {
    return await Clients.findAll();
}

const addClientsService = async (cedula: number,
                                name: string,
                                email: string) => {
    return await Clients.create({ cedula, name, email });
};

const getClientByIdService = async ( id: number): Promise<Clients | null> => {
    return await Clients.findByPk(id)
};

const updateClientsService = async (id: number, updatedData: Partial<Clients>) => {
    const client = await Clients.findByPk(id);
    if (!client) return null;
    return await client.update(id, updatedData);
};

const deleteClientsService = async ( id: number) => {
    const client = await Clients.findByPk(id);
    if (!client) return false
    return await client.destroy();
};

const getClientByCedulaServices = async (cc: number): Promise<Clients[]> => {
    return await Clients.findAll({ where: { cedula: cc } });
}

const getStoryByClient = async (id: number): Promise<Orders[]> => {
    return await Orders.findAll({where: {clientId: id}})
}

export { getClientsService, addClientsService, getClientByIdService, updateClientsService, deleteClientsService, getClientByCedulaServices, getStoryByClient };