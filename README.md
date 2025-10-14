# Prueba Desempeño – API REST con Node.js, TypeScript y PostgreSQL

## Descripción
Este proyecto es una API REST desarrollada con **Node.js**, **TypeScript** y **Sequelize ORM**, conectada a una base de datos **PostgreSQL**.  
Está estructurada con un enfoque modular y orientado a servicios, permitiendo una gestión clara de entidades como usuarios, órdenes, productos, etc.

El objetivo del proyecto es demostrar el dominio de **buenas prácticas de backend**, incluyendo:
- Arquitectura en capas (controladores, servicios, middlewares, modelos).
- Tipado estricto con TypeScript.
- Conexión segura a base de datos PostgreSQL usando Sequelize.
- Validación de roles y permisos (por ejemplo: analistas sólo pueden modificar el estado de las órdenes).
- Autenticación basada en JWT.
- Variables de entorno y configuración con `dotenv`.

---

## Tecnologías utilizadas
| Tecnología | Descripción |
|-------------|-------------|
| **Node.js** | Entorno de ejecución para el backend |
| **TypeScript** | Superset tipado de JavaScript |
| **Express** | Framework minimalista para construir la API REST |
| **Sequelize** | ORM para gestionar la base de datos PostgreSQL |
| **PostgreSQL** | Sistema de gestión de bases de datos relacional |
| **bcrypt** | Encriptación de contraseñas |
| **jsonwebtoken (JWT)** | Autenticación de usuarios |
| **dotenv** | Manejo de variables de entorno |
| **Nodemon** | Recarga automática en desarrollo |

---

## Estructura del proyecto
```
prueba_desempeno
├── .env_example          # Ejemplo de variables de entorno
├── app.ts                # Punto de entrada principal
├── nodemon.json          # Configuración de reinicio automático
├── tsconfig.json         # Configuración del compilador TypeScript
├── package.json          # Dependencias y scripts
└── src/
    ├── controllers/      # Lógica de las rutas HTTP
    ├── services/         # Lógica de negocio
    ├── models/           # Definición de entidades Sequelize
    ├── routes/           # Definición de endpoints
    ├── middlewares/      # Validaciones, autenticación, roles, etc.
    ├── dbconfig/         # Conexión a la base de datos
```

---

## Scripts disponibles

| Comando               | Descripción                                               |
|-----------------------|-----------------------------------------------------------|
| `npm run dev`         | Ejecuta el servidor en modo desarrollo con **nodemon**    |
| `npm i / npm install` | Descarga todas las dependencias que requiere el proyecto. |


---

## Configuración de la base de datos
El proyecto utiliza **PostgreSQL**.  
Asegúrate de tener una instancia activa y configurar las variables de entorno en un archivo `.env` en la raíz:

```bash
PORT=3002
DB_USER=tu_usuario_postgreSQL
DB_PASSWORD=tu_contraseña_postgreSQL
DB_NAME=nombre_base_datos
JWT_SECRET=tu_JWT_secret
JWT_REFRESH_TOKEN=tu_refresh_JWT
```

---

## Tipos de usuario y permisos
- **Admin:** CRUD completo sobre las entidades.
- **Analista:** sólo puede ver órdenes y actualizar su estado.

El control de permisos se realiza en los **services** mediante validación de rol:
```ts
if (role !== "admin") {
  // Solo permitir actualización de estado
}
```

---

## Autenticación
El sistema usa **JSON Web Tokens (JWT)**:
1. Al iniciar sesión, el servidor genera un token con los datos del usuario.
2. Las rutas protegidas requieren enviar el token en el encabezado:
   ```
   Authorization: Bearer <token>
   ```
3. El middleware valida el token y extrae `req.user` para validar el rol.

---

## Ejecución local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/prueba_desempeno.git
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env`
4. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```
---

## Creación de la base de datos

### Ingresar como superusuario
sudo -u postgres psql

### Crear usuario y base de datos
CREATE USER tu_user WITH PASSWORD tu_password;
CREATE DATABASE tu_base_datos OWNER tu_user;

### Conectarse a la base
\c tu_base_datos

### Otorgar privilegios
GRANT ALL PRIVILEGES ON DATABASE tu_base_datos TO tu_user;
ALTER SCHEMA public OWNER TO tu_user;
GRANT ALL ON SCHEMA public TO tu_user;

---

### Tabla de usuarios (autenticación y roles)
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role VARCHAR(20) CHECK (role IN ('admin', 'analista')) NOT NULL
);

### Tabla de clientes
CREATE TABLE clients (
id SERIAL PRIMARY KEY,
cedula VARCHAR(20) UNIQUE NOT NULL,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL
);

### Tabla de direcciones de clientes
CREATE TABLE addresses (
id SERIAL PRIMARY KEY,
clientId INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
address TEXT NOT NULL,
city VARCHAR(100),
active BOOLEAN DEFAULT TRUE
);

### Tabla de bodegas
CREATE TABLE warehouses (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
location VARCHAR(150),
active BOOLEAN DEFAULT TRUE
);

### Tabla de productos
CREATE TABLE products (
id SERIAL PRIMARY KEY,
code VARCHAR(50) UNIQUE NOT NULL,
name VARCHAR(100) NOT NULL,
description TEXT,
stock INT NOT NULL CHECK (stock >= 0),
warehouseId INT REFERENCES warehouses(id) ON DELETE SET NULL,
active BOOLEAN DEFAULT TRUE
);

### Tabla de órdenes de entrega
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
clientId INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
productId INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
warehouseId INT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
addressId INT NOT NULL REFERENCES addresses(id) ON DELETE CASCADE,
status VARCHAR(20) CHECK (status IN ('pendiente', 'en_transito', 'entregada')) DEFAULT 'pendiente',
quantity INT
);

---

## Requisitos previos
- Node.js ≥ 19
- PostgreSQL ≥ 14
- npm ≥ 8

---

## Autora
**Sharon Ortiz**  
**CLAN:** Linus 
🔗 [GitHub: SOrtizRamirez](https://github.com/SOrtizRamirez)