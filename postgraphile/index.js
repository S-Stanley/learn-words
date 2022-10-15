const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');

const port = 5433;

const app = express();

app.use(cors());

app.use(postgraphile(
    process.env.db_uri,
    'public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
));

app.listen(port, () => {
    console.info('Running on', port);
});