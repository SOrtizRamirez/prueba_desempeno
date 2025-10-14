import express from 'express';
import bodyParser from "body-parser";
import { initDB } from './src/dbconfig/db.ts';
import usersRouter from './src/routes/users.routes.ts';
import ordersRouter from "./src/routes/orders.routes.ts";
import clientsRouter from "./src/routes/clients.routes.ts";
import productsRouter from "./src/routes/products.routes.ts";
import addressesRouter from "./src/routes/addresses.routes.ts";
import warehousesRouter from "./src/routes/warehouses.routes.ts";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(usersRouter);
app.use(ordersRouter);
app.use(clientsRouter);
app.use(productsRouter);
app.use(addressesRouter);
app.use(warehousesRouter);

(async () => {
    try {
        await initDB();
        app.listen(port, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Error al conectar');
    }
})();