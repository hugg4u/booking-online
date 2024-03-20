import { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import { db } from '../../lib/db';
import { ERROR_RES, SALT, SuccessResponseType } from '../../constant';

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

// export const login = async (req: Request, res: Response) => {
//     const { username, password } = req.body;

//     let user = await db.

// };
