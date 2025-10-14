import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig/db.ts";
import { Clients } from "./clients.model.ts";

export class Addresses extends Model {
    declare id!: number;
    declare clientId!: number;
    declare address!: string;
    declare city!: string;
    declare active!: boolean;
}

Addresses.init(
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
                model: 'clients',
                key: 'id',
                onDelete: 'CASCADE',
            }
        },
            address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
                type: DataTypes.STRING,
            allowNull: false
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { isIn: [ true, false ] }
        }
    },
    {
        sequelize,
        tableName: "addresses",
        timestamps: false
    }
);
Clients.hasMany(Addresses, { foreignKey: "clientId" });
Addresses.belongsTo(Clients, { foreignKey: "clientId" });
