import db from '../db';
const feedTable = 'feed'

export const saveFeed = async (d, tx=db) => {
    const result = await tx(feedTable).insert(d).returning('id');
    return result;
}

export const fetchAllFeeds = async (tx=db) => {
   return await tx(feedTable).select('*').where({});
}

export const fetchFeedById = async (id: string, tx=db) => {
    return await tx(feedTable).select('*').where({ id });
}

export const updateFeed = async (id: string, data, tx=db) => {
    return await tx(feedTable).where({ id }).update(data);
}

export const deleteFeed = async (id: string, tx=db) => {
    return await tx(feedTable).delete().where({ id })
}