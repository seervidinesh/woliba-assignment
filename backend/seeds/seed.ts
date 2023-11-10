import Bcrypt from 'bcrypt';
import { Role } from '../src/authentication/types';
import db from '../src/db'

export const seed = async () => {
    try {
        const encryptedPassword = await Bcrypt.hash('Admin@123', 10);
        const users = [
            {
                email: 'crvidinesh@gmail.com',
                roles: [Role.Admin],
                password: encryptedPassword
            },
            {
                email: 'crvidinesh2@gmail.com',
                roles: [Role.User],
                password: encryptedPassword
            },
            {
                email: 'crvidinesh3@gmail.com',
                roles: [Role.SuperUser],
                password: encryptedPassword
            }
        ]
        await db('users').insert(users);

        const feed = [
            {
                url: 'http://www.example1.com',
                isVerified: false
            },
            {
                url: 'http://www.example2.com',
                isVerified: true
            }
        ]

        await db('feed').insert(feed);

    } catch (error) {
        console.log(error);
    }
}