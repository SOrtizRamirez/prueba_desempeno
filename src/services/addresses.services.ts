import { Addresses } from "../models/addresses.model.ts";

const getAddressService = async (): Promise<Addresses[]>=> {
    return await Addresses.findAll();
}

const addAddressService = async ( clientId: number,
                                  address: string,
                                  city: string,
                                  active: boolean) => {
    return await Addresses.create({ clientId, address, city, active });
};

const getAddressByIdService = async ( id: number): Promise<Addresses | null> => {
    return await Addresses.findByPk(id)
};

const updateAddressService = async (id: number, updatedData: Partial<Addresses>) => {
    const address = await Addresses.findByPk(id);
    if (!address) return null;
    return await address.update(id, updatedData);
};

const deleteAddressService = async ( id: number) => {
    const address = await Addresses.findByPk(id);
    if (!address) return false
    return await address.destroy();
};


export { getAddressService, addAddressService, getAddressByIdService, updateAddressService, deleteAddressService };