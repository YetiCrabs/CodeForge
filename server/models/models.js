const { Pool } = require('pg');

const PG_URI = 'postgres://qpjpdyzc:NH1lMZteHL4kYEciWAV9uxUvBvSITJoW@ruby.db.elephantsql.com:5432/qpjpdyzc';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
