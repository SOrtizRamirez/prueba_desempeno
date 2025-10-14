import { Warehouses } from "../models/warehouses.model.ts";

const getWarehouseService = async (): Promise<Warehouses[]>=> {
    return await Warehouses.findAll();
}

const addWarehouseService = async ( name: string, location: string, active: boolean) => {
    return await Warehouses.create({ name, location, active });
};

const getWarehouseByIdService = async ( id: number): Promise<Warehouses | null> => {
    return await Warehouses.findByPk(id)
};

const updateWarehouseService = async (id: number, updatedData: Partial<Warehouses>) => {
    const Warehouse = await Warehouses.findByPk(id);
    if (!Warehouse) return null;
    return await Warehouse.update(id, updatedData);
};

const deleteWarehouseService = async ( id: number) => {
    const Warehouse = await Warehouses.findByPk(id);
    if (!Warehouse) return false
    return await Warehouse.destroy();
};


export { getWarehouseService, addWarehouseService, getWarehouseByIdService, updateWarehouseService, deleteWarehouseService };