import config from '../../src/config';
import { init } from '../../src/server';
import knex from '../../src/db';
import _ from 'ramda';

// drop all collections
// eslint-disable-next-line no-var
var testEnv: undefined | any;

async function resetDB() {
    const query = `
        TRUNCATE table users, feed
        RESTART IDENTITY CASCADE;
    `;
    return await knex.raw(query);
}

async function initTestServer() {
    const updateConfig = _.mergeRight(config, {});
    const { server, handlers } = await init(updateConfig);


    await knex.migrate.rollback();
    await knex.migrate.latest();

    return {
        server,
        resetDB: resetDB,
        authHandler: handlers.authHandler,
        userHandler: handlers.userHandler,
        bookHandler: handlers.bookHandler,
    };
}

export async function getTestEnv() {
    if (testEnv === undefined) {
        // eslint-disable-next-line fp/no-mutation
        testEnv = await initTestServer();
    }
    return testEnv;
}
