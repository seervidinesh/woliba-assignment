import Bcrypt from 'bcrypt';
import { Either, isLeft, right, left, isRight } from 'fp-ts/lib/Either';
import * as _ from 'ramda';
import { userAccountCreated, userAccountCreationFailed } from '../logEvents';
import * as repo from './repo';
import { NewUser, User, UserRegistrationError } from './types';


export interface UserInterface {
    signUpUser(signUpDetails: NewUser): Promise<Either<UserRegistrationError, User>>;
    userDetails(userId: string): void;
}

export class UserHandler implements UserInterface {
    async signUpUser(signUpDetails: NewUser): Promise<Either<UserRegistrationError, User>> {
        try {
            const hashedPassword = await Bcrypt.hash(signUpDetails.password, 10);
            if (!hashedPassword) return left('passwordHashingFailed');
            const result = await repo.saveUser({
                email: signUpDetails.email,
                roles: signUpDetails.roles,
                password: hashedPassword
            });
            if (isLeft(result)) {
                userAccountCreationFailed({ phone: signUpDetails.email, reason: result.left });
                return left(result.left);
            }
        
            userAccountCreated({ _id: result.right._id, phone: signUpDetails.email });
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }
    async userDetails(userId: string) {
        try {
            const result = await repo.getUser({ id: userId });
            if(isRight(result)) return result.right;
            return result.left;
        } catch (error) {
            return 'serverError'
        }
    }
}