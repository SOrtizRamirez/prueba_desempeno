import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";

export class Clients extends Model {
    declare id!: number;
    declare cedula!: number;
    declare name!: string;
    declare email!: string;
}

Clients.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cedula:{
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        name:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "clients",
        timestamps: false
    }
)