import * as Joi from 'joi';

export const feedSchema = Joi.object({
    url: Joi.string().required(),
    isVerified: Joi.bool().optional(),
});

export interface Feed {
    url: string;
    isVerified: boolean;
}

export type FeedCreateError = 
    | 'feedAlreadyExists'
    | 'serverError'

export type FeedFetchError = 
    | 'feedsNotFound'
    | 'serverError'