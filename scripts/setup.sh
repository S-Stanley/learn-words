#!/bin/bash

docker volume create db_volume

bash scripts/up.sh
bash scripts/reset-local-database.sh