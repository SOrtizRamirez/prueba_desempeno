import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";

export class Warehouses extends Model {
    declare id!: number;
    declare name!: string;
    declare location!: string;
    declare active!: boolean;
}

Warehouses.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "warehouses",
        timestamps: false
    }
)