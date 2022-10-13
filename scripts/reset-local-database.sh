#!/bin/bash

docker-compose exec db sh -c "cd /databases/ && psql -U postgres --quiet -f setup.sql"