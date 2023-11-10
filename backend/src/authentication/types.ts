import { Either } from 'fp-ts/lib/Either';
import * as Joi from 'joi';
import { AuthError } from '../responses/types';

export enum Role {
    SuperUser = 'SUPER_USER',
    Admin = 'ADMIN',
    User = 'USER'
}

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(6).max(18)
});

export interface LoginDetails {
    email: string;
    password: string;
}

export interface LoginResponse {
    authToken: string;
    userId: string;
}


export interface AuthenticationHandler {
    login(loginDetails: LoginDetails): Promise<Either<AuthError, LoginResponse>>;
    getUserToken(user): Promise<string>;
    validateJWTToken(credentials, request, h): Promise<{ isValid: boolean }>;
    logout(sessionId): void;
}