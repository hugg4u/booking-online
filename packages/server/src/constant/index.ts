export type SuccessResponseType = {
    data: {
        data: Record<string, string | string[] | number | Date>;
        meta_data: Record<string, string>;
    };
    message: string | undefined;
};

export type ErrorResponseType = {
    errors: Record<string, string | string[]>;
    message: string | undefined;
};

export const ERROR_RES: ErrorResponseType = {
    errors: {},
    message: '',
};

export const SUCCESS_RES: SuccessResponseType = {
    data: {
        data: undefined,
        meta_data: undefined,
    },
    message: 'Successful',
};

export const SALT: number = 10;
