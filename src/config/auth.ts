import ms from "ms";

interface IJwtConfig {
    secret: string;
    expiresIn: ms.StringValue;
}

export const jwtConfig: IJwtConfig = {
    secret: process.env.JWT_SECRET || 'CHANGE_ME',
    expiresIn: (process.env.JWT_EXPIRES_IN as ms.StringValue) || '1d',
};