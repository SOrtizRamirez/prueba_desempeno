import "dotenv/config"
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export const initDB = async () => {
    try {
        await sequelize.authenticate({})
        console.log("Conectado a PostgresSQL database")
    } catch (error) {
        console.log('Error al conectar')
    }
};

export default sequelize;