DROP DATABASE IF EXISTS dev;
CREATE DATABASE dev;

\c dev

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\i types.sql;

\i schemas/public.sql;

\i fixtures/users-fixtures.sql;

\copy words (in_french, to_learn) FROM 'data/sp.csv' DELIMITER ';' CSV