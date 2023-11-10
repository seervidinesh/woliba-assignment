import * as _ from 'ramda';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { NewUser, UserRegistrationError, UserWithPassword } from './types';
import db from '../db';

const userTable = 'public.users';

export const saveUser = async (d: NewUser, tx=db): Promise<Either<UserRegistrationError, any>> => {
    const isExists = await getUser({ email: d.email });
    if(isLeft(isExists)) {
        const result = await tx(userTable).insert(d).returning('*');
        return right(result);
    }
    return left('userAlreadyExist');
}

export const getUser = async (condition, tx=db): Promise<Either<'userNotFound', UserWithPassword>> => {
    const user: any = await tx(userTable).select('*').where(condition);
    if(user.length) return right(user[0]);
    return left('userNotFound');
}