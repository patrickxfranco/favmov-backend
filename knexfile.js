import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, 'source', 'database', 'database.db'),
		},
		pool: {
			afterCreate: (conn, cb) => {
				conn.run('PRAGMA foreign_keys = ON', cb);
			},
		},
		useNullAsDefault: true,
		migrations: {
			directory: path.resolve(__dirname, 'source', 'database', 'knex', 'migrations'),
		},
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, 'source', 'database', 'database.db'),
		},
		pool: {
			afterCreate: (conn, cb) => {
				conn.run('PRAGMA foreign_keys = ON', cb);
			},
		},
		useNullAsDefault: true,
		migrations: {
			directory: path.resolve(__dirname, 'source', 'database', 'knex', 'migrations'),
		},
	},
};
