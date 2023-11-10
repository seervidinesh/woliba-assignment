import db from '../db';
const sessionTable = 'public.session';

export const saveSession = async (sessionId, userId, tx=db) => {
    const session = await tx(sessionTable).insert({ sessionId, userId }).returning('*');
    return session;
}

export const getSessionBySessionId = async (sessionId: string, tx=db) => {
    return (await tx(sessionTable).select('*').where({ sessionId }))[0];
}

export const deleteSession = async (sessionId: string, tx=db) => {
    return await tx(sessionTable).delete().where({ sessionId });
}