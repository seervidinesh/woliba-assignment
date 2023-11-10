import * as chai from 'chai';
import { isRight } from 'fp-ts/lib/Either';
import { getTestEnv } from '../env/testEnvironment';
import { seed } from '../../seeds/seed';

// import repo
import * as UserRepo from '../../src/user/repo';
import * as FeedRepo from '../../src/feed/repo';

const expect = chai.expect;

describe('User repo', async () => {
  let testEnv;
  let server;
  beforeEach(async () => {
    testEnv = await getTestEnv();
    server = testEnv.server;
    await testEnv.resetDB();
    await seed();
  });
  afterEach(async () => {
    await server.stop();
  });
  it('Fetch user by email', async () => {
    const result = await UserRepo.getUser({
      email: 'crvidinesh@gmail.com'
    });
    expect(result._tag).to.be.eql('Right');
    if(isRight(result)) {
      expect(result.right.email).to.be.eql('crvidinesh@gmail.com');
      expect(result.right.roles).to.be.eql(['ADMIN']);
    }
  });
});

describe('Feed repo', async () => {
  let testEnv;
  let server;
  beforeEach(async () => {
    testEnv = await getTestEnv();
    server = testEnv.server;
    await testEnv.resetDB();
    await seed();
  });
  afterEach(async () => {
    await server.stop();
  }); 
  it('Fetch all feeds', async () => {
    const result = await FeedRepo.fetchAllFeeds();
    expect(result.length).to.be.eql(2);
    expect(result[0].url).to.be.eql('http://www.example1.com');
  });
});