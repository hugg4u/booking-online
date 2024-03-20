import { Request, Response } from 'express';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../lib/db';
import {
    ERROR_RES,
    EXPIRES_TOKEN,
    SALT,
    SuccessResponseType,
    TOKEN_KEY,
    TOKEN_TYPE,
} from '../../constant';

export const signup = async (req: Request, res: Response) => {
    const { password, name, email } = req.body;

    let user = await db.user.findFirst({
        where: { email },
    });

    if (user) {
        return res.status(400).json({
            ...ERROR_RES,
            errors: { message: 'Account already exist!' },
        });
    }

    user = await db.user.create({
        data: {
            name,
            email,
            hashedPassword: hashSync(password, SALT),
        },
    });

    const successObj: SuccessResponseType = {
        data: {
            data: user,
            meta_data: undefined,
        },
        message: 'Create new account successfully!',
    };

    return res.status(200).json(successObj);
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Wrong email or password!',
        });
    }

    const user = await db.user.findFirst({ where: { email } });

    if (!user) {
        return res.status(400).json({
            message: 'Account invalid!',
        });
    }

    const isCorrectPassword = await compareSync(password, user.hashedPassword);

    if (!isCorrectPassword) {
        return res.status(403).json({
            message: 'Wrong password!',
        });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        TOKEN_KEY,
        { expiresIn: EXPIRES_TOKEN }
    );

    const updateUserToken = await db.account.create({
        data: {
            token_type: TOKEN_TYPE,
            userId: user.id,
            access_token: token,
        },
    });

    const successObj: SuccessResponseType = {
        data: {
            data: {
                name: user.name,
                email: user.email,
                access_token: updateUserToken.access_token,
            },
        },
        message: 'Login successfully!',
    };

    return res.status(200).json(successObj);
};
