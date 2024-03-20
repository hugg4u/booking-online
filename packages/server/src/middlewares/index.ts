/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TOKEN_KEY } from '../constant';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.headers['x-access-token'] as string;

    if (!accessToken) {
        return res.status(401).json({
            message: 'Authentication required!',
        });
    }

    try {
        const tokenDecoded = jwt.verify(accessToken, TOKEN_KEY);
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token!' });
    }
};
