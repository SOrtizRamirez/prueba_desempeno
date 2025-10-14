import { Orders } from "../models/orders.model.ts";
import { Clients } from "../models/clients.model.ts";
import { Products } from "../models/products.model.ts";

const getOrdersService = async (): Promise<Orders[]>=> {
    return await Orders.findAll();
}

const addOrdersService = async (role: string | null,
                                clientId: number,
                                productId: number,
                                warehouseId: number,
                                addressId: number,
                                status: string,
                                quantity: number) => {
    if (role !== "admin") return null;

    const client = await Clients.findOne({ where: { id: clientId } });
    if (!client) return null;

    const stock = await Products.findOne({ where: { id: productId } });
    if (!stock) return null;
    if(stock.stock < quantity ) {
        return null;
    } else {
        const updatedStock = await stock.update({ where: { id: productId, stock: (stock - quantity) } });
        const order = await Orders.create({ clientId, productId, warehouseId, addressId, status, quantity})
        return [updatedStock, order]
    }
};

const getOrderByIdService = async (id: number): Promise<Orders | null> => {
    return await Orders.findByPk(id)
};

const updateOrdersService = async ( role: string, id: number, updatedData: Partial<Orders>) => {
    const order = await Orders.findByPk(id);
    if (!order) return null;
    if (role !== "admin") {
        if (!updatedData.status) {
            throw new Error("Los analistas solo pueden actualizar el estado");
        }
        return await order.update({ status: updatedData.status });
    }
    await order.update(updatedData);
    return order;
};

const deleteOrdersService = async (id: number) => {
    const order = await Orders.findByPk(id);
    if (!order) return false
    return await order.destroy();
};

export { getOrdersService, addOrdersService, getOrderByIdService, updateOrdersService, deleteOrdersService };