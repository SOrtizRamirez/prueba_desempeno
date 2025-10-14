import type { NextFunction, Request, Response } from "express";

export async function requireRoleFromDB(req: Request, res: Response, next: NextFunction) {
    try{
        const user = req.user;
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        const isAdmin = user.role;
        if (isAdmin !== 'admin') return res.status(403).json({ error: "Forbidden" });

        return next();
    } catch (error) {
        res.status(400).json({ error: "Forbidden" });
    }

}

export const getRoleFromJWT = (req: Request) => req.user?.role ?? null;