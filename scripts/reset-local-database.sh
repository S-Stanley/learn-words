#!/bin/bash

docker stop learn-words-graphql-api-1

docker-compose exec db sh -c "cd /databases/ && psql -U postgres --quiet -f setup.sql"

docker-compose up -d graphql-api