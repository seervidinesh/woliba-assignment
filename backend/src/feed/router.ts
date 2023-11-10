import * as Hapi from '@hapi/hapi';
import { BookHandler } from './handler'
import { isLeft } from 'fp-ts/lib/Either';
import { feedSchema } from './types';
import { wrapError } from '../responses/wrapper'
import { Role } from '../authentication/types';
import Joi from 'joi';


export default function (server: Hapi.Server, bookHandler: BookHandler) {
    // add new feed to database
    server.route({
        method: 'POST',
        path: '/feed/create',
        options: {
            handler: async (request, h) => {
                const { payload } = request;
                const response = await bookHandler.saveFeed(payload);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin, Role.SuperUser ]
            },
            tags: ['api', 'Book'],
            validate: {
                payload: feedSchema,
            },
            description: 'Create new book',
            notes: 'Create new book',
        },
    });

    // GET all books
    server.route({
        method: 'GET',
        path: '/feed/all',
        options: {
            handler: async (request, h) => {
                const response = await bookHandler.fetchAllFeeds();
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin, Role.User, Role.SuperUser ]
            },
            tags: ['api', 'book'],
            description: 'Fetch all book',
            notes: 'Fetch all book',
        },
    });

    // GET book by SKU
    server.route({
        method: 'GET',
        path: '/feed/{id}',
        options: {
            handler: async (request, h) => {
                const { id } = request.params;
                const response = await bookHandler.fetchFeed(id);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin, Role.User, Role.SuperUser ]
            },
            tags: ['api', 'book'],
            validate: {
                params: Joi.object({
                    id: Joi.string()
                }),
            },
            description: 'Fetch book by id',
            notes: 'Fetch book by id',
        },
    });

    // PUT update book ID
    server.route({
        method: 'PUT',
        path: '/feed/{id}',
        options: {
            handler: async (request, h) => {
                const { isVerified } = request.payload;
                const { id } = request.params;
                const response = await bookHandler.updateFeed(id, isVerified);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.SuperUser ]
            },
            tags: ['api', 'book'],
            validate: {
                payload: Joi.object({
                    isVerified: Joi.bool().optional()
                }),
                params: Joi.object({
                    id: Joi.string()
                })
            },
            description: 'Update book data by id',
            notes: 'Update book data by id',
        },
    });

    // DELETE delete book 
    server.route({
        method: 'DELETE',
        path: '/feed/{id}',
        options: {
            handler: async (request, h) => {
                const { id } = request.params;
                const response = await bookHandler.deleteFeed(id);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.SuperUser ]
            },
            tags: ['api', 'book'],
            validate: {
                params: Joi.object({
                    id: Joi.string(),
                }),
            },
            description: 'delete book ',
            notes: 'delete book ',
        },
    });
}
