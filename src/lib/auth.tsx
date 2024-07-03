import { jwtVerify, jwtDecrypt } from 'jose';

interface UserJwtPayload {
    jti: string,
    iat: number
}

export const getJWTSecretKey = () => {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length == 0) {
        throw new Error("The secret key isn't good");
    }

    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJWTSecretKey()));
        return verified.payload as UserJwtPayload;
    }
    catch (error) {
        throw new Error("Your token is expired");
    }
}