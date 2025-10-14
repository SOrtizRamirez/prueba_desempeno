import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";

export class Users extends Model {
    declare id!: number;
    declare name!: string;
    declare email!: string;
    declare passwordHash!: string;
    declare role!: string;
}

Users.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordHash:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: ['admin', 'analyst']
            }
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false
    }
)