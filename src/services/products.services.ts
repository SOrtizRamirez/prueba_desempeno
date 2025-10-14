import { Products } from "../models/products.model.ts";
import { Warehouses } from "../models/warehouses.model.ts";

const getProductsService = async (): Promise<Products[]>=> {
    return await Products.findAll();
}

const addProductsService = async (code: number,
                                  name: string,
                                  description: string,
                                  stock: number,
                                  warehouseId: number,
                                  active: boolean) => {

    const warehouse = await Warehouses.findOne({ where: { id: warehouseId } });
    if (!warehouse) return null;

    return await Products.create({ code, name, description, stock, warehouseId, active });
};

const getProductsByIdService = async (id: number): Promise<Products | null> => {
    return await Products.findByPk(id)
};

const updateProductsService = async ( id: number, updatedData: Partial<Products>) => {
    const product = await Products.findOne({ where: { id: id } });
    if (!product) return null;
    return product.update(updatedData);
};

const deleteProductsService = async (id: number) => {
    const product = await Products.findByPk(id);
    if (!product) return false
    return await product.destroy();
};

const getProductByCodeService = async (code: number) => {
    const product = await Products.findOne({ where: { code } });
    if (!product) return null;
    const warehouse = await Warehouses.findOne({ where: { id: product.warehouseId }});
    return [product.code, product.name, product.description, product.stock, warehouse, product.active];
}

export { getProductsService,
    addProductsService,
    getProductsByIdService,
    updateProductsService,
    deleteProductsService,
    getProductByCodeService };