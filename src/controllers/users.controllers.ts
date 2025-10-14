import { type Request, type Response } from 'express';
import {
    getUserService,
    addUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    loginService } from '../services/users.services.ts'
import {getStoryByClient} from "../services/clients.services";


export const getUsersController = (req:Request, res:Response) => {
    try{
        getUserService().then((response) => {
            res.send(response);
        })
    }catch(e){
        res.sendStatus(400);
    }
}

export const addUsersController = async (req: Request, res: Response) => {
    try {
        const { name, email, role, password } = req.body;
        const savedUsers = await addUserService( name, email, password, role);
        res.status(201).json(savedUsers);
    } catch (e) {
        const code = Number(e?.status || 500);
        return res.status(Number.isInteger(code) ? code : 500).json({ error: e?.message ?? "Error" });
    }
};

export const getUsersByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const Users = await getUserByIdService(id);

        res.json(Users);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const updateUsersController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;

        const updatedUsers = await updateUserService(id, updatedData);

        res.json(updatedUsers);
    } catch (e) {
        res.sendStatus(400);
    }
};

export const deleteUsersController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteUserService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (e) {
        res.sendStatus(400);
    }
};

export const loginController = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body ?? {};

        if (!email || !password) return res.status(400).json({ error: "Email y contraseña son obligatorios." });

        const result = await loginService(email, password);
        if (!result) return res.status(401).json({ error: "Credenciales no válidas." });

        const { accessToken, refreshToken } = result;
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            access_token: accessToken,
            token_type: "Bearer"
        })
    } catch (e) {
        res.sendStatus(400);
    }
};





