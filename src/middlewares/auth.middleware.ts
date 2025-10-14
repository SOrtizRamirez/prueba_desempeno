import 'dotenv/config';
import jwt from 'jsonwebtoken';
import type {User} from "../interfaces/users.interfaces.ts";
import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: { id?:number ; role?: string;  };
    }
}

export const users = [];
export let refreshTokens = [];

export function generateRefreshToken(user) {
    const freshToken = jwt.sign(
        {
            id: user.id, email: user.email, role: user.role
        },
        process.env.REFRESH_TOKEN || 'secret',
        { expiresIn: '7h' },
    );
    refreshTokens.push(freshToken)
    return freshToken;
}

export function generateAccessToken(user:User) {
    return jwt.sign(
        {
            id: user.id, email: user.email, role: user.role
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: "15m" }
    );
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}
const JWT_SECRET = process.env.JWT_HS256_SECRET || process.env.JWT_SECRET;

export function authenticateAccessToken(req:Request, res:Response, next:NextFunction) {
    console.log('Entré a service authentication token');
    try {
        const auth = req.header("authorization") || "";
        if (!auth.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Missing Bearer token" });
        }
        const token = auth.slice(7).trim();
        if (!token) return res.status(401).json({ error: "Missing token" });
        if (!JWT_SECRET) return res.status(500).json({ error: "JWT secret not configured" });
        const payload = jwt.verify(token, JWT_SECRET) as any;
        req.user = payload;
        return next();
    } catch (e: any) {
        const code = e?.name === "TokenExpiredError" ? 401 : 401;
        return res.status(code).json({ error: e?.message ?? "Invalid token" });
    }
}

