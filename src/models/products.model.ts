import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";
import { Warehouses } from "./warehouses.model.ts";

export class Products extends Model {
    declare id!: number;
    declare code!: number;
    declare name!: string;
    declare description!: string;
    declare stock!: number;
    declare warehouseId!: number;
    declare active!: boolean;
}

Products.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        stock:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        warehouseId:{
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "warehouses",
                key: "id",
                onDelete: "CASCADE"
            }
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "products",
        timestamps: false
    }
);

Warehouses.hasMany(Products, { foreignKey: "warehouseId" });
Products.belongsTo(Warehouses, { foreignKey: "warehouseId" });

