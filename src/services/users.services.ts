import { Users } from "../models/users.model.ts"

import {
    generateAccessToken,
    generateRefreshToken,
    hashPassword,
    refreshTokens
} from "../middlewares/auth.middleware.ts";
import bcrypt from "bcrypt";


const getUserService = async (): Promise<Users[]>=> {
    return await Users.findAll();
}

const addUserService = async ( name: string, email: string, password: string, role: string) => {

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) return null;

    const passwordHash = await hashPassword(password);

    return await Users.create({ name, email, passwordHash, role})
};

const getUserByIdService = async (id: number): Promise<Users | null> => {
    return await Users.findByPk(id)
};

const updateUserService = async (id: number, updatedData: Partial<Users>) => {
    const user = await Users.findByPk(id)
    if (!user) return null;
    return await user.update(updatedData);
};

const deleteUserService = async (id: number) => {
    const user = await Users.findByPk(id);
    if (!user) return false
    await user.destroy();
    return true
};

const loginService = async (email: string, password: string) => {
    const user = await Users.findOne({where: { email }});
    if (!user) return null;

    const pass = await bcrypt.compare(password, user.passwordHash);
    if (!pass) return null;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    return {refreshToken, accessToken};
}




export { getUserService, addUserService, getUserByIdService, updateUserService, deleteUserService, loginService };