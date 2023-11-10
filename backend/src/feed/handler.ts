import { Either, isLeft, right, left } from 'fp-ts/lib/Either';
import * as _ from 'ramda';
import * as repo from './repo';
import { Feed, FeedCreateError, FeedFetchError } from './types';


export interface BookInterface {
    saveFeed(productData: Feed): Promise<Either<FeedCreateError, Feed>>;
    fetchAllFeeds(): Promise<Either<FeedFetchError, Feed[]>>;
    fetchFeed(sku: string): Promise<Either<FeedFetchError, Feed>>;
    updateFeed(sku: string, isVerified: boolean): Promise<Either<FeedFetchError, Feed>>;
    deleteFeed(sku: string): Promise<Either<FeedFetchError, any>>;
}

export class BookHandler implements BookInterface {
    async saveFeed(productData: Feed): Promise<Either<FeedCreateError, any>> {
        try {
            const result = await repo.saveFeed({
                url: productData.url,
                isVerified: productData.isVerified,
            });
            if (!result.length) return left('feedAlreadyExists');
            return right(result[0]);
        } catch (error) {
            return left('serverError');
        }
    }

    async fetchAllFeeds(): Promise<Either<FeedFetchError, Feed[]>> {
        try {
            const result = await repo.fetchAllFeeds();
            if (!result.length) return left('feedsNotFound');
            return right(result);
        } catch (error) {
            return left('serverError');
        }
    }

    async fetchFeed(id: string): Promise<Either<FeedFetchError, Feed>> {
        try {
            const result = await repo.fetchFeedById(id);
            if (!result.length) return left('feedsNotFound')
            return right(result[0]);
        } catch (error) {
            return left('serverError');
        }
    }

    async updateFeed(id: string, isVerified: boolean): Promise<Either<FeedFetchError, any>> {
        try {
            const result: any = await repo.updateFeed(id, { isVerified });
            if (!result) return left('feedsNotFound');
            return right(result);
        } catch (error) {
            return left('serverError');
        }
    }

    async deleteFeed(id: string): Promise<Either<FeedFetchError, any>> {
        try {
            const result = await repo.deleteFeed(id);
            if (!result) return left('serverError');
            return right(result);
        } catch (error) {
            return left('serverError');
        }
    }
}