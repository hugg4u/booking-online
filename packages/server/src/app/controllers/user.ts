import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { SuccessResponseType } from '../../constant';
import { db } from '../../lib/db';
import { TokenDecoded } from '../../types';

export const getUser = async (req: Request, res: Response) => {
    const accessToken = req.headers?.['x-access-token'] as string;

    const tokenDecoded = jwtDecode(accessToken) as TokenDecoded;

    const user = await db.user.findUnique({
        where: {
            id: tokenDecoded.id,
        },
    });

    if (!user) {
        res.status(403).json({
            message: 'User not found!',
        });
    }

    const successObj: SuccessResponseType = {
        data: {
            data: user,
        },
        message: 'Get user successfully!',
    };

    return res.status(200).json(successObj);
};
