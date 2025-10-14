export interface orders {
    id: number;
    clientId: number;
    productId: number;
    warehouseId: number;
    addressId: number;
    status: string;
    createdAt: Date;
}