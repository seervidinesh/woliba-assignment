import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const query = `
        CREATE TABLE users (
            "createdAt" timestamptz DEFAULT now(),
            "updatedAt" timestamptz DEFAULT now(),
            id serial PRIMARY KEY,
            email TEXT,
            roles TEXT ARRAY,
            password TEXT
        );

        CREATE TABLE feed (
            "createdAt" timestamptz DEFAULT now(),
            "updatedAt" timestamptz DEFAULT now(),
            id serial PRIMARY KEY,
            url TEXT,
            "isVerified" BOOLEAN DEFAULT false
        );

        CREATE TABLE session (
            "createdAt" timestamptz DEFAULT now(),
            "updatedAt" timestamptz DEFAULT now(),
            "id" serial PRIMARY KEY,
            "sessionId" TEXT,
            "userId" TEXT
        );

    `
    return knex.schema.raw(query);
}


export async function down(knex: Knex): Promise<void> {
    const query = `
        DROP TABLE if exists users CASCADE;
        DROP TABLE if exists feed CASCADE;
        DROP TABLE if exists session CASCADE;
    `
    return knex.schema.raw(query);
}

