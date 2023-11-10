import { knex} from 'knex';
import pg from 'pg';
import * as knexconfig from '../knexfile';

const db = knex(knexconfig);

pg.types.setTypeParser(20, 'text', parseInt);

export default db;