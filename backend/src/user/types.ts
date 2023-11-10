import * as Joi from 'joi';
import { Role } from '../authentication/types';

export const signUpSchema = Joi.object({
    email: Joi.string().required(),
    roles: Joi.array().items(...Object.values(Role)).required(),
    password: Joi.string().required().min(6).max(18)
});

export interface NewUser {
    email: string;
    roles: Role[];
    password: string;
}

export type UserRegistrationError =
    | 'userAlreadyExist'
    | 'passwordHashingFailed'
    | 'inValidPhoneNumber'
    | 'serverError'

export type UserID = Number;

export interface User {
    createdAt?: string,
    id: string;
    email: string;
    roles: Role[];
}

export interface UserWithPassword extends User {
    password?: string;
}