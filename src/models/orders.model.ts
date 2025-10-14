import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";
import { Clients } from "./clients.model.ts";
import { Addresses } from "./addresses.model.ts";
import { Warehouses } from "./warehouses.model.ts";

export class Orders extends Model {
    declare id!: number;
    declare clientId!: number;
    declare productId!: number;
    declare warehouseId!: number;
    declare addressId!: number;
    declare status!: string;
    declare quantity!: number;
}

Orders.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clientId:{
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "clients",
                key: "id",
                onDelete: "CASCADE"
            }
        },
        productId:{
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
                onDelete: "CASCADE"
            }
        },
        warehouseId:{
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "warehouses",
                key: "warehouseId",
                onDelete: "CASCADE"
            }
        },
        addressId:{
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "addresses",
                key: "addressId",
                onDelete: "CASCADE"
            }
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: ['pendiente', 'en_tránsito', 'entregado']
            }
        },
        quantity:{
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: false
    }
);

Clients.hasMany(Orders, { foreignKey: "clientId" });
Orders.belongsTo(Clients, { foreignKey: "clientId" });

Warehouses.hasMany(Orders, { foreignKey: "warehouseId" });
Orders.belongsTo(Warehouses, { foreignKey: "warehouseId" });

Addresses.hasMany(Orders, { foreignKey: "addressId" });
Orders.belongsTo(Addresses, { foreignKey: "addressId" });
