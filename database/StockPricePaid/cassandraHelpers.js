const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], localDataCenter: 'datacenter1', keyspace: 'ks1' });

const query = 'SELECT name, email FROM users WHERE key = ?';

client.execute(query, [ 'someone' ], function(err, result) {
  assert.ifError(err);
  console.log('User with email %s', result.rows[0].email);
});

CREATE TABLE averageprice (
  id integer primary key,
  tickers text,
  companyname text,
  day integer,
  price float,
);

cqlsh> CREATE KEYSPACE IF NOT EXISTS stocks WITH REPLICATION = { 'class' : 'SimpleStrategy', 'datacenter1' : 3 };
