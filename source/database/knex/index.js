import config from '../../../knexfile.js';
import knex from 'knex';

const connection = knex(config.production);

export default connection;
